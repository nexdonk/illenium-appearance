import React, { createContext, useState, useCallback, useContext, useEffect, ReactNode } from 'react';
import Locales from '../shared/interfaces/locales';

interface Display {
  appearance: boolean;
  asynchronous: boolean;
}

// Accent is an "R, G, B" string so it can be dropped straight into rgba(...)
// expressions in CSS. Default matches the original near-white active-state so
// nothing visibly shifts until a theme actually arrives from Lua.
const DEFAULT_ACCENT = '250, 250, 250';

interface NuiState {
  display: Display;
  locales?: Locales;
  accent: string;
}

interface NuiContextData {
  display: Display;
  setDisplay(value: Display): void;
  locales?: Locales;
  setLocales(value: Locales): void;
  accent: string;
  setAccent(value: string): void;
}

const INITIAL_STATE: NuiState = {
  display: {
    appearance: !import.meta.env.PROD, // Show appearance UI in development mode
    asynchronous: false,
  },
  accent: DEFAULT_ACCENT,
};

const NuiContext = createContext<NuiContextData>({} as NuiContextData);

// Parse "R, G, B" / "R,G,B" / "#rrggbb" / "rgb(r,g,b)" into [r, g, b]. Returns
// null on anything we can't interpret so the caller can fall back to the
// default accent instead of rendering NaN into CSS.
const parseRgb = (raw: string): [number, number, number] | null => {
  if (!raw) return null;
  const trimmed = raw.trim();

  if (trimmed.startsWith('#')) {
    const hex = trimmed.slice(1);
    const expanded = hex.length === 3
      ? hex.split('').map(c => c + c).join('')
      : hex;
    if (expanded.length !== 6) return null;
    const n = parseInt(expanded, 16);
    if (Number.isNaN(n)) return null;
    return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
  }

  const nums = trimmed
    .replace(/^rgba?\(/i, '')
    .replace(/\)$/, '')
    .split(',')
    .map(s => parseInt(s.trim(), 10));

  if (nums.length < 3 || nums.some(Number.isNaN)) return null;
  return [nums[0], nums[1], nums[2]];
};

const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));

// Slightly darker variant for hover — same recipe the old palette used
// (`primary → primaryHover` was a 10% darken).
const darken = ([r, g, b]: [number, number, number], amount = 0.1): string => {
  const factor = 1 - amount;
  return `${clamp(r * factor)}, ${clamp(g * factor)}, ${clamp(b * factor)}`;
};

// Pick black or white text based on perceived luminance so an active pill on a
// bright accent stays readable. Threshold 0.6 keeps near-white (the default)
// rendering black text just like before.
const contrastOn = ([r, g, b]: [number, number, number]): string => {
  const srgb = [r, g, b].map(v => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  const luminance = 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  // Match the legacy contrast colors so existing visuals don't drift: bright
  // accents → near-black (#09090b), dark accents → near-white (#fafafa).
  return luminance > 0.6 ? '9, 9, 11' : '250, 250, 250';
};

// Additive, chroma-scaled tint. Adds the accent on TOP of the original gray
// base so the lightness floor (and thus the original surface-vs-surface
// separation) is preserved. Scaled by the accent's chroma — neutrals (black,
// white, gray) contribute nothing, so the dark palette stays exactly as
// designed. Colored accents add a wash whose strength tracks how vivid they
// are.
const tintSurface = (
  base: [number, number, number],
  accent: [number, number, number],
  amount: number,
): string => {
  const max = Math.max(accent[0], accent[1], accent[2]);
  const min = Math.min(accent[0], accent[1], accent[2]);
  const chroma = (max - min) / 255;
  const a = amount * chroma;
  return `${clamp(base[0] + accent[0] * a)}, ${clamp(base[1] + accent[1] * a)}, ${clamp(base[2] + accent[2] * a)}`;
};

// Choose between the colored-accent overlay and a neutral fallback so panels
// don't grow black or pure-white borders/glows when the active theme has no
// real hue (e.g. the default theme uses black for backwards compat).
const chromaOf = (accent: [number, number, number]) =>
  (Math.max(...accent) - Math.min(...accent)) / 255;

// Each surface bucket maps to a previously-hardcoded gray. The accent
// percentage is high enough that the theme reads on every surface, and rises
// with elevation so brighter chrome saturates harder — same physics as real
// materials. Borders saturate hardest so panel outlines pop the color.
//
// Several "intermediate" surfaces (active/hover variants) exist so dropdown
// headers and toggle buttons keep their original active-vs-inactive lightness
// step instead of collapsing onto one shade.
// Bases dropped ~40% from the original grays so the dark palette reads as
// actually black-ish on the default (neutral) theme. Layer separation is
// preserved — each surface still differs from its neighbours by the same
// relative steps as before, just compressed toward black. Colored themes add
// their hue on top of this darker floor.
const SURFACE_BASES: { name: string; base: [number, number, number]; amount: number }[] = [
  { name: '--surface-0',              base: [5,  5,  6],    amount: 0.18 }, // was #0a0a0c
  { name: '--surface-1',              base: [8,  8,  10],   amount: 0.22 }, // was #0f0f11
  { name: '--surface-2',              base: [11, 11, 13],   amount: 0.26 }, // was #141416
  { name: '--surface-3',              base: [14, 14, 16],   amount: 0.30 }, // was #18181b
  { name: '--surface-4',              base: [17, 17, 17],   amount: 0.34 }, // was #1c1c1c
  { name: '--surface-active',         base: [20, 20, 23],   amount: 0.36 }, // was #1f1f23
  { name: '--surface-inactive-hover', base: [21, 21, 23],   amount: 0.37 }, // was #202022
  { name: '--surface-active-hover',   base: [23, 23, 26],   amount: 0.38 }, // was #222226
  { name: '--surface-5',              base: [27, 27, 29],   amount: 0.40 }, // was #27272a
  { name: '--surface-6',              base: [36, 36, 36],   amount: 0.45 }, // was #333333
  { name: '--border-surface',         base: [42, 42, 42],   amount: 0.55 }, // #2a2a2a — original
  { name: '--border-strong',          base: [69, 69, 69],   amount: 0.60 }, // #454545 — original
];

const applyAccent = (accent: string) => {
  const parsed = parseRgb(accent) ?? parseRgb(DEFAULT_ACCENT)!;
  const root = document.documentElement;

  // For neutral accents (black / gray / pure white) the active highlights
  // would either disappear into the dark palette or read as a stark white
  // slab. Fall back to the original near-white #fafafa so the UI looks like
  // it did pre-theming — a colored theme picks up its own hue here.
  const effective: [number, number, number] =
    chromaOf(parsed) > 0.1 ? parsed : [250, 250, 250];

  root.style.setProperty('--accent', `${effective[0]}, ${effective[1]}, ${effective[2]}`);
  root.style.setProperty('--accent-hover', darken(effective, 0.1));
  root.style.setProperty('--accent-contrast', contrastOn(effective));

  // Surfaces (panels / backgrounds) stay neutral dark no matter what the accent
  // is — the accent only recolors the white foreground (text + icons), never the
  // backgrounds. Emit each surface's neutral base with no accent wash.
  for (const { name, base } of SURFACE_BASES) {
    root.style.setProperty(name, `${base[0]}, ${base[1]}, ${base[2]}`);
  }

  // Borders + glows also stay neutral (a subtle white hairline, no colored glow)
  // so a colored accent never bleeds into panel outlines or shadows.
  root.style.setProperty('--accent-border', 'rgba(255, 255, 255, 0.10)');
  root.style.setProperty('--accent-border-soft', 'rgba(255, 255, 255, 0.07)');
  root.style.setProperty('--accent-glow', 'rgba(0, 0, 0, 0)');
};

const NuiStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<NuiState>(INITIAL_STATE);

  // Push the accent into :root every time it changes so any styled-component
  // that reads `var(--accent)` updates immediately.
  useEffect(() => {
    applyAccent(data.accent);
  }, [data.accent]);

  const setDisplay = useCallback(
    (value: Display) => {
      setData(state => ({
        ...state,
        display: {
          ...value,
        },
      }));
    },
    [setData],
  );

  const setLocales = useCallback(
    (value: Locales) => {
      setData(state => ({
        ...state,
        locales: value,
      }));
    },
    [setData],
  );

  const setAccent = useCallback(
    (value: string) => {
      setData(state => ({
        ...state,
        accent: value || DEFAULT_ACCENT,
      }));
    },
    [setData],
  );

  const contextValue = {
    display: data.display,
    setDisplay,
    locales: data.locales,
    setLocales,
    accent: data.accent,
    setAccent,
  };

  return <NuiContext.Provider value={contextValue}>{children}</NuiContext.Provider>;
};

function useNuiState(): NuiContextData {
  const context = useContext(NuiContext);

  return context;
}

export { NuiStateProvider, useNuiState };
