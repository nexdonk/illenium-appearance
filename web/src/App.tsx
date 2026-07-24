import { useEffect } from 'react';
import { NuiStateProvider } from './hooks/nuiState';
import GlobalStyles from './styles/global';
import { modernTheme } from './styles/theme';

import Appearance from './components/Appearance';
import { ThemeProvider } from 'styled-components';

// The whole UI is laid out in absolute pixels designed for a 1080p viewport.
// Without scaling, it renders microscopic on 4K and oversized on 720p. Setting
// document.documentElement.style.zoom proportional to the player's actual
// viewport height keeps every panel/button at the same on-screen proportion
// across 1080p, 1440p, ultrawide 1440p, 4K, 8K, and below-720p. zoom is the
// right tool here (not transform: scale) because it also rescales the
// reference frame for px-based fixed positioning, which the modal/options
// bars rely on.
const useViewportScale = () => {
  useEffect(() => {
    const applyScale = () => {
      // 1080 is the design baseline. Clamp so the UI stays usable on weirdly
      // small/large resolutions (e.g. a 600px-tall window or an 8K monitor).
      const scale = Math.max(0.6, Math.min(4, window.innerHeight / 1080));
      // `zoom` is non-standard but supported in every Chromium release that
      // shipped CEF (FiveM's NUI runtime), so we set it directly on <html>.
      (document.documentElement.style as any).zoom = String(scale);
    };
    applyScale();
    window.addEventListener('resize', applyScale);
    return () => window.removeEventListener('resize', applyScale);
  }, []);
};

const App: React.FC = () => {
  useViewportScale();
  return (
    <NuiStateProvider>
      <ThemeProvider theme={modernTheme}>
        <GlobalStyles />
        <Appearance />
      </ThemeProvider>
    </NuiStateProvider>
  );
};

export default App;
