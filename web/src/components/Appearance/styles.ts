import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  overflow: hidden;
`;

export const Vignette = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0) 40%,
    rgba(0, 0, 0, 0.55) 80%,
    rgba(0, 0, 0, 0.85) 100%
  );
`;

export const PanelStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 16px;
  gap: 12px;
`;

export const ActionBar = styled.div.attrs({ 'data-ui-panel': 'true' })`
  width: 460px;
  max-width: 32vw;
  display: flex;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 14px;
  background: rgb(var(--surface-1));
  border: 1px solid var(--accent-border-soft);
  box-shadow:
    0 32px 64px -12px rgba(0, 0, 0, 0.6),
    0 0 24px var(--accent-glow),
    inset 0 1px 1px rgba(255, 255, 255, 0.04);
`;

export const PanelGroup = styled.div.attrs({ 'data-ui-panel': 'true' })`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 12px;
  margin: 16px;
  /* Match the height the ped menu naturally has (9 tabs × 64 + 8 × 10 gap =
     656 px). Shops with only a few visible tabs would otherwise collapse
     LeftColumn down to the rail's height and squash the dropdowns. Capped to
     the viewport so it never overflows on small screens. */
  height: min(656px, calc(100vh - 32px));
`;

export const LeftColumn = styled.div.attrs({ 'data-ui-panel': 'true' })`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 10px;
  min-width: 0;
`;

export const OuterFrame = styled.div.attrs({ 'data-ui-panel': 'true' })`
  flex: 1 1 0;
  min-height: 0;

  display: flex;
  flex-direction: column;
  /* No right padding so the scrollbar sits flush against the frame's inner
     rounded edge. overflow:hidden makes the border-radius clip the scrollbar
     so it never bleeds past the rounded corner. */
  padding: 6px 0 6px 6px;
  border-radius: 12px;
  overflow: hidden;

  background: rgb(var(--surface-3));
  border: 1px solid var(--accent-border);
  box-shadow:
    0 32px 64px -12px rgba(0, 0, 0, 0.65),
    0 0 32px var(--accent-glow),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
`;

export const HeaderCard = styled.div.attrs({ 'data-ui-panel': 'true' })`
  width: 100%;
  flex-shrink: 0;

  display: flex;
  align-items: center;
  gap: 14px;

  padding: 12px 16px;
  border-radius: 14px;

  background: rgb(var(--surface-3));
  border: 1px solid var(--accent-border);
  box-shadow:
    0 32px 64px -12px rgba(0, 0, 0, 0.6),
    0 0 28px var(--accent-glow),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
`;

export const TabRail = styled.div.attrs({ 'data-ui-panel': 'true' })`
  display: flex;
  flex-direction: column;
  gap: 10px;

  /* Now that PanelGroup is full-height, the rail would stretch and leave a
     huge gap below the last tab. Anchor it to the top so it only takes the
     space its visible tabs need. */
  align-self: flex-start;

  max-height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  ::-webkit-scrollbar { display: none; }
`;

interface TabButtonProps {
  active?: boolean;
}

export const TabButton = styled.button<TabButtonProps>`
  flex-shrink: 0;
  width: 84px;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Icon pinned to the top, label pinned to the bottom — so every tab's label
     lines up along the same bottom baseline across the whole rail. */
  justify-content: space-between;
  gap: 4px;

  padding: 10px 6px 10px;
  border-radius: 10px;
  cursor: pointer;
  outline: none;
  font-family: inherit;

  /* Active is just a slightly brighter surface (not a stark white accent fill)
     with a subtle border — a gentle highlight. On colored themes --surface-6
     carries a faint accent tint, so it still nods to the theme. */
  background: ${({ active }) => (active ? 'rgb(var(--surface-6))' : 'rgb(var(--surface-2))')};
  color: rgb(var(--accent));
  border: 1px solid
    ${({ active }) => (active ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.07)')};
  box-shadow: ${({ active }) =>
    active
      ? '0 2px 8px rgba(0, 0, 0, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.06)'
      : '0 2px 4px rgba(0, 0, 0, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.04)'};

  transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  &:hover {
    background: ${({ active }) => (active ? 'rgb(var(--surface-6))' : 'rgb(var(--surface-3))')};
    color: rgb(var(--accent));
    border-color: ${({ active }) =>
      active ? 'rgba(255, 255, 255, 0.24)' : 'rgba(255, 255, 255, 0.16)'};
  }

  &:active {
    transform: scale(0.96);
  }

  svg {
    color: inherit;
    flex-shrink: 0;
  }
`;

export const TabLabel = styled.span`
  width: 100%;
  font-size: 11px;
  font-weight: 400;
  letter-spacing: 0.1px;
  line-height: 1.1;
  text-align: center;
  color: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Container = styled.div.attrs({ 'data-ui-panel': 'true' })`
  flex: 1 1 0;
  width: 460px;
  max-width: 32vw;
  min-height: 0;

  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;

  padding: 0;
  position: relative;

  background: transparent;
  border: none;
  box-shadow: none;

  overflow: hidden;
`;

export const PanelBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 1 1 0;
  min-height: 0;

  /* Scrollbar sits flush against the OuterFrame's inner rounded edge (which is
     why OuterFrame has no right padding). padding-right reserves a 6 px gap
     between the section pills and the scrollbar so the pills aren't shoved
     against it. */
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 6px;

  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.18) transparent;

  ::-webkit-scrollbar { width: 6px; background: transparent; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.10);
    border-radius: 10px;
    &:hover { background: rgba(255, 255, 255, 0.20); }
  }
  ::-webkit-scrollbar-corner { background: transparent; }

  scroll-behavior: smooth;
`;

export const PanelFooter = styled.div.attrs({ 'data-ui-panel': 'true' })`
  width: 100%;
  display: flex;
  gap: 8px;
  flex-shrink: 0;

  > button { flex: 1; }
`;

export const LauncherDock = styled.div.attrs({ 'data-ui-panel': 'true' })`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 6px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  background: rgb(var(--surface-3));
  border: 1px solid var(--accent-border);
  border-bottom: none;
  box-shadow:
    0 -12px 30px -8px rgba(0, 0, 0, 0.55),
    0 -8px 24px var(--accent-glow),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
`;

export const ImportExportLauncher = styled.button`
  height: 40px;
  width: 140px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  font-family: inherit;
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.2px;
  cursor: pointer;

  background: rgb(var(--surface-0));
  color: rgb(var(--accent));
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 10px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.4);

  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: rgb(var(--surface-2));
    border-color: rgba(255, 255, 255, 0.18);
  }
`;

export const FlexWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;

  > div { flex: 1; }
`;

export const SectionGrid = styled.div`
  display: grid;
  gap: 16px;
  width: 100%;
`;

export const HeaderSection = styled.div`
  padding-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  margin-bottom: 24px;
`;

export const PanelHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;

  padding: 4px 4px 16px 4px;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
`;

export const PanelHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
`;

export const PanelHeaderActions = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;

  > button { flex: 1; }
`;

export const PanelHeaderIcon = styled.div`
  flex-shrink: 0;
  height: 52px;
  width: 52px;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 14px;
  background: linear-gradient(135deg, rgb(var(--surface-4)) 0%, rgb(var(--surface-2)) 100%);
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow:
    0 6px 14px rgba(0, 0, 0, 0.45),
    inset 0 1px 1px rgba(255, 255, 255, 0.06);
  color: rgb(var(--accent));
`;

export const PanelHeaderText = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

export const PanelHeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 400;
  color: rgb(var(--accent));
  margin: 0;
  line-height: 1.2;
  letter-spacing: 0.2px;
`;

export const PanelHeaderSubtitle = styled.span`
  font-size: 12px;
  font-weight: 300;
  color: #a1a1aa;
  margin-top: 4px;
  line-height: 1.3;
  letter-spacing: 0.2px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 400;
  color: rgb(var(--accent));
  margin: 0 0 8px 0;
  line-height: 1.25;
`;

export const SectionDescription = styled.p`
  font-size: 14px;
  color: #a1a1aa;
  margin: 0;
  line-height: 1.5;
`;
