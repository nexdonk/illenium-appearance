import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import swap from '@iconify-icons/mdi/swap-horizontal';
import download from '@iconify-icons/mdi/import';
import upload from '@iconify-icons/mdi/export';
import closeIcon from '@iconify-icons/mdi/close';
import circleCheck from '@iconify-icons/mdi/check-circle';
import circleX from '@iconify-icons/mdi/close-circle';
import infoIcon from '@iconify-icons/mdi/information';

import { PedAppearance } from './interfaces';
import {
  pedToJson,
  pedToXml,
  pedFromJson,
  pedFromXml,
  mergeAppearance,
} from './serialize';

type Mode = 'import-json' | 'import-xml' | 'export-json' | 'export-xml';
type Direction = 'import' | 'export';
type Format = 'json' | 'xml';

interface ImportExportProps {
  open: boolean;
  data: PedAppearance;
  onClose: () => void;
  onImport: (next: PedAppearance) => void;
}

/* Original single-column layout: header + close, a full-width Import/Export
   switch, a JSON/XML toggle, a monospace data editor, and a footer action.
   Backgrounds stay neutral dark; the accent only ever colours the foreground. */

const Modal = styled.div.attrs({ 'data-ui-panel': 'true' })`
  display: flex;
  flex-direction: column;
  gap: 14px;
  width: 100%;
  max-width: 520px;
  height: min(80vh, 600px);

  padding: 18px;
  border-radius: 16px;
  background: rgb(var(--surface-2));
  border: 1px solid rgb(var(--surface-5));
  box-shadow: 0 32px 64px -12px rgba(0, 0, 0, 0.7);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderIcon = styled.div`
  flex-shrink: 0;
  height: 42px;
  width: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(var(--accent), 0.12);
  border: 1px solid rgba(var(--accent), 0.4);
  color: rgb(var(--accent));
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--accent));
  margin: 0;
  line-height: 1.2;
  letter-spacing: 0.1px;
`;

const Subtitle = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: #8f8f8f;
  margin-top: 3px;
  line-height: 1.3;
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  height: 34px;
  width: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
  background: rgb(var(--surface-4));
  color: #8f8f8f;
  border: 1px solid rgb(var(--surface-5));
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: rgb(var(--surface-5));
    color: rgb(var(--accent));
    border-color: rgb(var(--border-strong));
  }
`;

/* Full-width two-segment direction switch (Import / Export). */
const Switch = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  padding: 6px;
  background: rgb(var(--surface-3));
  border: 1px solid rgb(var(--surface-5));
  border-radius: 12px;
`;

const SwitchButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  height: 44px;
  border-radius: 9px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.2px;
  color: ${({ active }) => (active ? 'rgb(var(--accent))' : '#8a8a8a')};
  background: ${({ active }) => (active ? 'rgba(var(--accent), 0.12)' : 'transparent')};
  border: 1px solid ${({ active }) => (active ? 'rgba(var(--accent), 0.5)' : 'transparent')};
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  &:hover {
    color: ${({ active }) => (active ? 'rgb(var(--accent))' : '#dadada')};
    background: ${({ active }) => (active ? 'rgba(var(--accent), 0.16)' : 'rgba(255, 255, 255, 0.04)')};
  }
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FormatToggle = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  background: rgb(var(--surface-3));
  border: 1px solid rgb(var(--surface-5));
  border-radius: 9px;
`;

const FormatButton = styled.button<{ active: boolean }>`
  padding: 5px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.6px;
  color: ${({ active }) => (active ? 'rgb(var(--accent))' : '#8a8a8a')};
  background: ${({ active }) => (active ? 'rgba(var(--accent), 0.13)' : 'transparent')};
  border: 1px solid ${({ active }) => (active ? 'rgba(var(--accent), 0.5)' : 'transparent')};
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  &:hover {
    color: ${({ active }) => (active ? 'rgb(var(--accent))' : '#dadada')};
  }
`;

const FileMeta = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 500;
  color: #808080;
  font-variant-numeric: tabular-nums;
`;

const Dot = styled.span`
  color: #4f4f4f;
`;

/* The editor sits on the darkest surface so the data reads like a code panel. */
const Editor = styled.div`
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  background: rgb(var(--surface-1));
  border: 1px solid rgb(var(--surface-5));
  border-radius: 12px;
  padding: 14px 16px;
  transition: border-color 0.15s ease;

  &:focus-within {
    border-color: rgba(var(--accent), 0.5);
  }
`;

const TextArea = styled.textarea`
  flex: 1;
  resize: none;
  background: transparent;
  border: none;
  outline: none;
  color: rgb(var(--accent));
  font-family: 'Consolas', 'SFMono-Regular', 'Menlo', monospace;
  font-size: 13px;
  line-height: 1.6;
  width: 100%;

  &::placeholder { color: #555; }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StatusPill = styled.div<{ kind: 'info' | 'error' | 'ok' }>`
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 9px 14px 9px 10px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  min-width: 0;

  background: ${({ kind }) =>
    kind === 'error' ? '#2a1414' :
    kind === 'ok'    ? '#13261a' :
                       'rgb(var(--surface-4))'};
  border: 1px solid ${({ kind }) =>
    kind === 'error' ? '#5a2222' :
    kind === 'ok'    ? '#1f4a2c' :
                       'rgb(var(--surface-5))'};
  color: ${({ kind }) =>
    kind === 'error' ? '#fca5a5' :
    kind === 'ok'    ? '#86efac' :
                       '#bdbdbd'};

  span.msg {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StatusIcon = styled.div<{ kind: 'info' | 'error' | 'ok' }>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ kind }) =>
    kind === 'error' ? '#f87171' :
    kind === 'ok'    ? '#4ade80' :
                       '#9a9a9a'};
`;

const Spacer = styled.div`
  flex: 1;
`;

const GhostButton = styled.button`
  padding: 11px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  background: rgb(var(--surface-4));
  color: #a0a0a0;
  border: 1px solid rgb(var(--surface-5));
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  &:hover {
    color: rgb(var(--accent));
    border-color: rgb(var(--border-strong));
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-family: inherit;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.2px;
  background: rgba(var(--accent), 0.14);
  color: rgb(var(--accent));
  border: 1px solid rgba(var(--accent), 0.55);
  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: rgba(var(--accent), 0.22);
    border-color: rgb(var(--accent));
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
`;

const composeMode = (dir: Direction, fmt: Format): Mode => `${dir}-${fmt}` as Mode;
const isImport = (m: Mode) => m === 'import-json' || m === 'import-xml';
const isJson   = (m: Mode) => m === 'import-json' || m === 'export-json';

const filenameFor = (mode: Mode) =>
  isJson(mode) ? 'character-data.json' : 'character-data.xml';

const placeholderFor = (mode: Mode) =>
  isJson(mode) ? 'Paste your JSON here...' : 'Paste your XML here...';

// FiveM's CEF often blocks navigator.clipboard, so we lead with execCommand on
// the visible textarea (which is allowed because it's user-initiated and the
// textarea already has the content). The async clipboard API is a fallback.
function copyTextViaTextarea(textarea: HTMLTextAreaElement | null, value: string): boolean {
  const ta = textarea ?? (() => {
    const el = document.createElement('textarea');
    el.value = value;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.top = '0';
    el.style.left = '0';
    el.style.opacity = '0';
    el.style.pointerEvents = 'none';
    document.body.appendChild(el);
    return el;
  })();

  const wasReadOnly = ta.hasAttribute('readonly');
  const prevSelectionStart = ta.selectionStart;
  const prevSelectionEnd = ta.selectionEnd;

  try {
    ta.removeAttribute('readonly');
    ta.focus();
    ta.select();
    ta.setSelectionRange(0, value.length);
    const ok = document.execCommand('copy');
    if (wasReadOnly) ta.setAttribute('readonly', '');
    // Restore the prior selection range so we don't leave the textarea in a weird state
    try { ta.setSelectionRange(prevSelectionStart, prevSelectionEnd); } catch {}
    return ok;
  } catch {
    if (wasReadOnly) ta.setAttribute('readonly', '');
    return false;
  } finally {
    if (ta !== textarea && ta.parentElement) ta.parentElement.removeChild(ta);
  }
}

const ImportExport = ({ open, data, onClose, onImport }: ImportExportProps) => {
  const [mode, setMode] = useState<Mode>('import-json');
  const [text, setText] = useState('');
  const [status, setStatus] = useState<{ kind: 'info' | 'error' | 'ok'; msg: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const direction: Direction = isImport(mode) ? 'import' : 'export';
  const format: Format = isJson(mode) ? 'json' : 'xml';

  const exported = useMemo(() => {
    if (mode === 'export-json') return pedToJson(data);
    if (mode === 'export-xml')  return pedToXml(data);
    return '';
  }, [mode, data]);

  useEffect(() => {
    setStatus(null);
    if (isImport(mode)) {
      setText('');
    } else {
      setText(exported);
    }
  }, [mode, exported]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleAction = async () => {
    if (isImport(mode)) {
      const trimmed = text.trim();
      if (!trimmed) {
        setStatus({ kind: 'error', msg: 'Nothing to import — paste your data first.' });
        return;
      }
      try {
        const partial = isJson(mode) ? pedFromJson(trimmed) : pedFromXml(trimmed);
        const merged = mergeAppearance(data, partial);
        onImport(merged);
        setStatus({ kind: 'ok', msg: 'Imported — review the ped, then Save to keep it.' });
      } catch (err: any) {
        setStatus({ kind: 'error', msg: `Parse failed: ${err.message ?? err}` });
      }
    } else {
      let ok = copyTextViaTextarea(textareaRef.current, text);
      if (!ok && navigator.clipboard?.writeText) {
        try {
          await navigator.clipboard.writeText(text);
          ok = true;
        } catch { /* swallow — handled below */ }
      }
      if (ok) {
        setStatus({ kind: 'ok', msg: 'Copied to clipboard.' });
      } else {
        setStatus({ kind: 'error', msg: 'Could not copy — select all and copy manually.' });
      }
    }
  };

  const handleSecondary = () => {
    if (isImport(mode)) {
      setText('');
      setStatus(null);
    } else if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  };

  const statusIcon = status?.kind === 'ok' ? <Icon icon={circleCheck} width={16} height={16} />
    : status?.kind === 'error' ? <Icon icon={circleX} width={16} height={16} />
    : <Icon icon={infoIcon} width={16} height={16} />;

  return (
    <Modal onMouseDown={e => e.stopPropagation()}>
      <Header>
        <HeaderIcon><Icon icon={swap} width={20} height={20} /></HeaderIcon>
        <HeaderText>
          <Title>Character Data</Title>
          <Subtitle>Import or export your appearance as text</Subtitle>
        </HeaderText>
        <CloseButton type="button" onClick={onClose} aria-label="Close">
          <Icon icon={closeIcon} width={18} height={18} />
        </CloseButton>
      </Header>

      <Switch>
        <SwitchButton
          type="button"
          active={direction === 'import'}
          onClick={() => setMode(composeMode('import', format))}
        >
          <Icon icon={download} width={18} height={18} /> Import
        </SwitchButton>
        <SwitchButton
          type="button"
          active={direction === 'export'}
          onClick={() => setMode(composeMode('export', format))}
        >
          <Icon icon={upload} width={18} height={18} /> Export
        </SwitchButton>
      </Switch>

      <MetaRow>
        <FormatToggle>
          <FormatButton
            type="button"
            active={format === 'json'}
            onClick={() => setMode(composeMode(direction, 'json'))}
          >
            JSON
          </FormatButton>
          <FormatButton
            type="button"
            active={format === 'xml'}
            onClick={() => setMode(composeMode(direction, 'xml'))}
          >
            XML
          </FormatButton>
        </FormatToggle>
        <FileMeta>
          <span>{filenameFor(mode)}</span>
          <Dot>•</Dot>
          <span>{text.length.toLocaleString()} chars</span>
        </FileMeta>
      </MetaRow>

      <Editor>
        <TextArea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={placeholderFor(mode)}
          spellCheck={false}
          readOnly={!isImport(mode)}
        />
      </Editor>

      <Footer>
        {status && (
          <StatusPill kind={status.kind}>
            <StatusIcon kind={status.kind}>{statusIcon}</StatusIcon>
            <span className="msg">{status.msg}</span>
          </StatusPill>
        )}
        <Spacer />
        <GhostButton type="button" onClick={handleSecondary}>
          {isImport(mode) ? 'Clear' : 'Select all'}
        </GhostButton>
        <ActionButton type="button" onClick={handleAction}>
          <Icon icon={isImport(mode) ? download : upload} width={16} height={16} />
          {isImport(mode) ? 'Import' : 'Copy'}
        </ActionButton>
      </Footer>
    </Modal>
  );
};

export default ImportExport;
