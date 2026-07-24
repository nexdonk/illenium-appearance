import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  html { font-size: 16px; }

  body {
    background: transparent;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    font-weight: 300;
    color: rgb(var(--accent));
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    font-optical-sizing: auto;
    overflow: hidden;
    scroll-behavior: smooth;
  }

  button {
    cursor: pointer;
    outline: 0;
    border: none;
    background: none;
    font-family: inherit;
    transition: all 0.2s ease;
  }

  input, select, textarea {
    font-family: inherit;
    outline: 0;
    transition: all 0.2s ease;
  }

  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: transparent; border-radius: 9999px; }
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 9999px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: background 0.2s ease;
    &:hover { background: rgba(255, 255, 255, 0.16); }
  }

  ::selection {
    background: rgba(255, 255, 255, 0.15);
    color: rgb(var(--accent));
  }
`;
