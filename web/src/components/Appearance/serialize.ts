import {
  PedAppearance,
  PedHeadBlend,
  PedFaceFeatures,
  PedHeadOverlayValue,
  PedHeadOverlays,
  PedHair,
  PedComponent,
  PedProp,
  Tattoo,
  TattooList,
} from './interfaces';

// JSON

export function pedToJson(data: PedAppearance): string {
  return JSON.stringify(data, null, 2);
}

export function pedFromJson(input: string): Partial<PedAppearance> {
  const parsed = JSON.parse(input);
  if (!parsed || typeof parsed !== 'object') {
    throw new Error('JSON root must be an object');
  }
  return parsed as Partial<PedAppearance>;
}

// XML — hand-rolled because no XML lib is installed.

const esc = (s: string) =>
  s.replace(/&/g, '&amp;')
   .replace(/</g, '&lt;')
   .replace(/>/g, '&gt;')
   .replace(/"/g, '&quot;');

const indent = (level: number) => '  '.repeat(level);

const leaf = (tag: string, value: string | number, level: number) =>
  `${indent(level)}<${tag}>${esc(String(value))}</${tag}>`;

function serializeObject(
  tag: string,
  obj: Record<string, number | string | undefined>,
  level: number,
): string {
  const lines = [`${indent(level)}<${tag}>`];
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined) continue;
    lines.push(leaf(k, v, level + 1));
  }
  lines.push(`${indent(level)}</${tag}>`);
  return lines.join('\n');
}

function serializeHeadOverlays(overlays: PedHeadOverlays, level: number): string {
  const lines = [`${indent(level)}<headOverlays>`];
  for (const [name, val] of Object.entries(overlays)) {
    const v = val as PedHeadOverlayValue;
    lines.push(serializeObject(name, {
      style: v.style,
      opacity: v.opacity,
      ...(v.color !== undefined ? { color: v.color } : {}),
      ...(v.secondColor !== undefined ? { secondColor: v.secondColor } : {}),
    }, level + 1));
  }
  lines.push(`${indent(level)}</headOverlays>`);
  return lines.join('\n');
}

function serializeComponents(components: PedComponent[], level: number): string {
  const lines = [`${indent(level)}<components>`];
  for (const c of components) {
    lines.push(`${indent(level + 1)}<component id="${c.component_id}">`);
    lines.push(leaf('drawable', c.drawable, level + 2));
    lines.push(leaf('texture', c.texture, level + 2));
    lines.push(`${indent(level + 1)}</component>`);
  }
  lines.push(`${indent(level)}</components>`);
  return lines.join('\n');
}

function serializeProps(props: PedProp[], level: number): string {
  const lines = [`${indent(level)}<props>`];
  for (const p of props) {
    lines.push(`${indent(level + 1)}<prop id="${p.prop_id}">`);
    lines.push(leaf('drawable', p.drawable, level + 2));
    lines.push(leaf('texture', p.texture, level + 2));
    lines.push(`${indent(level + 1)}</prop>`);
  }
  lines.push(`${indent(level)}</props>`);
  return lines.join('\n');
}

function serializeTattoos(tattoos: TattooList, level: number): string {
  const lines = [`${indent(level)}<tattoos>`];
  for (const [zoneName, list] of Object.entries(tattoos || {})) {
    if (!Array.isArray(list) || list.length === 0) continue;
    lines.push(`${indent(level + 1)}<zone name="${esc(zoneName)}">`);
    for (const t of list) {
      lines.push(`${indent(level + 2)}<tattoo>`);
      lines.push(leaf('name', t.name ?? '', level + 3));
      lines.push(leaf('label', t.label ?? '', level + 3));
      lines.push(leaf('hashMale', t.hashMale ?? '', level + 3));
      lines.push(leaf('hashFemale', t.hashFemale ?? '', level + 3));
      lines.push(leaf('zone', t.zone ?? zoneName, level + 3));
      lines.push(leaf('collection', t.collection ?? '', level + 3));
      lines.push(leaf('opacity', t.opacity ?? 1, level + 3));
      lines.push(`${indent(level + 2)}</tattoo>`);
    }
    lines.push(`${indent(level + 1)}</zone>`);
  }
  lines.push(`${indent(level)}</tattoos>`);
  return lines.join('\n');
}

export function pedToXml(data: PedAppearance): string {
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<character>'];
  lines.push(leaf('model', data.model, 1));
  lines.push(leaf('eyeColor', data.eyeColor ?? 0, 1));
  if (data.headBlend) {
    lines.push(serializeObject('headBlend', data.headBlend as unknown as Record<string, number>, 1));
  }
  if (data.faceFeatures) {
    lines.push(serializeObject('faceFeatures', data.faceFeatures as unknown as Record<string, number>, 1));
  }
  if (data.headOverlays) {
    lines.push(serializeHeadOverlays(data.headOverlays, 1));
  }
  if (data.hair) {
    lines.push(serializeObject('hair', data.hair as unknown as Record<string, number>, 1));
  }
  if (data.components) {
    lines.push(serializeComponents(data.components, 1));
  }
  if (data.props) {
    lines.push(serializeProps(data.props, 1));
  }
  if (data.tattoos) {
    lines.push(serializeTattoos(data.tattoos, 1));
  }
  lines.push('</character>');
  return lines.join('\n');
}

// XML parse

function child(el: Element, name: string): Element | null {
  for (let i = 0; i < el.children.length; i += 1) {
    if (el.children[i].tagName === name) return el.children[i];
  }
  return null;
}

function children(el: Element, name: string): Element[] {
  const out: Element[] = [];
  for (let i = 0; i < el.children.length; i += 1) {
    if (el.children[i].tagName === name) out.push(el.children[i]);
  }
  return out;
}

function num(el: Element | null): number | undefined {
  if (!el) return undefined;
  const txt = (el.textContent ?? '').trim();
  if (txt === '') return undefined;
  const n = Number(txt);
  if (Number.isNaN(n)) throw new Error(`<${el.tagName}> is not a number: "${txt}"`);
  return n;
}

function str(el: Element | null): string | undefined {
  if (!el) return undefined;
  return (el.textContent ?? '').trim();
}

function readObject<T>(el: Element | null, keys: (keyof T)[]): T | undefined {
  if (!el) return undefined;
  const out = {} as { [K in keyof T]: number };
  for (const k of keys) {
    const v = num(child(el, k as string));
    if (v === undefined) return undefined;
    out[k] = v;
  }
  return out as unknown as T;
}

function readHeadBlend(root: Element): PedHeadBlend | undefined {
  return readObject<PedHeadBlend>(child(root, 'headBlend'), [
    'shapeFirst', 'shapeSecond', 'shapeThird',
    'skinFirst', 'skinSecond', 'skinThird',
    'shapeMix', 'skinMix', 'thirdMix',
  ]);
}

function readFaceFeatures(root: Element): PedFaceFeatures | undefined {
  return readObject<PedFaceFeatures>(child(root, 'faceFeatures'), [
    'noseWidth', 'nosePeakHigh', 'nosePeakSize', 'noseBoneHigh', 'nosePeakLowering', 'noseBoneTwist',
    'eyeBrownHigh', 'eyeBrownForward',
    'cheeksBoneHigh', 'cheeksBoneWidth', 'cheeksWidth',
    'eyesOpening', 'lipsThickness',
    'jawBoneWidth', 'jawBoneBackSize',
    'chinBoneLowering', 'chinBoneLenght', 'chinBoneSize', 'chinHole',
    'neckThickness',
  ]);
}

function readHair(root: Element): PedHair | undefined {
  return readObject<PedHair>(child(root, 'hair'), ['style', 'color', 'highlight', 'texture']);
}

function readHeadOverlays(root: Element): PedHeadOverlays | undefined {
  const el = child(root, 'headOverlays');
  if (!el) return undefined;
  const out = {} as PedHeadOverlays;
  for (let i = 0; i < el.children.length; i += 1) {
    const c = el.children[i];
    const name = c.tagName as keyof PedHeadOverlays;
    const style = num(child(c, 'style'));
    const opacity = num(child(c, 'opacity'));
    if (style === undefined || opacity === undefined) continue;
    const value: PedHeadOverlayValue = { style, opacity };
    const color = num(child(c, 'color'));
    if (color !== undefined) value.color = color;
    const secondColor = num(child(c, 'secondColor'));
    if (secondColor !== undefined) value.secondColor = secondColor;
    (out[name] as PedHeadOverlayValue) = value;
  }
  return out;
}

function readComponents(root: Element): PedComponent[] | undefined {
  const el = child(root, 'components');
  if (!el) return undefined;
  const out: PedComponent[] = [];
  for (const c of children(el, 'component')) {
    const id = Number(c.getAttribute('id'));
    const drawable = num(child(c, 'drawable'));
    const texture = num(child(c, 'texture'));
    if (Number.isNaN(id) || drawable === undefined || texture === undefined) continue;
    out.push({ component_id: id, drawable, texture });
  }
  return out;
}

function readProps(root: Element): PedProp[] | undefined {
  const el = child(root, 'props');
  if (!el) return undefined;
  const out: PedProp[] = [];
  for (const p of children(el, 'prop')) {
    const id = Number(p.getAttribute('id'));
    const drawable = num(child(p, 'drawable'));
    const texture = num(child(p, 'texture'));
    if (Number.isNaN(id) || drawable === undefined || texture === undefined) continue;
    out.push({ prop_id: id, drawable, texture });
  }
  return out;
}

function readTattoos(root: Element): TattooList | undefined {
  const el = child(root, 'tattoos');
  if (!el) return undefined;
  const out: TattooList = {};
  for (const z of children(el, 'zone')) {
    const zoneName = z.getAttribute('name') ?? '';
    if (!zoneName) continue;
    const list: Tattoo[] = [];
    for (const t of children(z, 'tattoo')) {
      const tattoo: Tattoo = {
        name: str(child(t, 'name')) ?? '',
        label: str(child(t, 'label')) ?? '',
        hashMale: str(child(t, 'hashMale')) ?? '',
        hashFemale: str(child(t, 'hashFemale')) ?? '',
        zone: str(child(t, 'zone')) ?? zoneName,
        collection: str(child(t, 'collection')) ?? '',
        opacity: num(child(t, 'opacity')) ?? 1,
      };
      list.push(tattoo);
    }
    out[zoneName] = list;
  }
  return out;
}

export function pedFromXml(input: string): Partial<PedAppearance> {
  const doc = new DOMParser().parseFromString(input, 'application/xml');
  const err = doc.getElementsByTagName('parsererror')[0];
  if (err) throw new Error(`XML parse error: ${err.textContent?.trim()}`);
  const root = doc.documentElement;
  if (!root || root.tagName !== 'character') {
    throw new Error('XML root must be <character>');
  }
  const out: Partial<PedAppearance> = {};
  const model = str(child(root, 'model'));
  if (model) out.model = model;
  const eyeColor = num(child(root, 'eyeColor'));
  if (eyeColor !== undefined) out.eyeColor = eyeColor;
  const headBlend = readHeadBlend(root);
  if (headBlend) out.headBlend = headBlend;
  const faceFeatures = readFaceFeatures(root);
  if (faceFeatures) out.faceFeatures = faceFeatures;
  const headOverlays = readHeadOverlays(root);
  if (headOverlays) out.headOverlays = headOverlays;
  const hair = readHair(root);
  if (hair) out.hair = hair;
  const components = readComponents(root);
  if (components) out.components = components;
  const props = readProps(root);
  if (props) out.props = props;
  const tattoos = readTattoos(root);
  if (tattoos) out.tattoos = tattoos;
  return out;
}

// Merge an imported partial appearance onto a current full appearance.
// Missing top-level fields fall back to the current value so partial imports stay safe.
export function mergeAppearance(current: PedAppearance, partial: Partial<PedAppearance>): PedAppearance {
  return {
    ...current,
    ...partial,
  };
}
