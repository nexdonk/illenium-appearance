import styled from 'styled-components';

export const Wrapper = styled.div.attrs({ 'data-ui-panel': 'true' })`
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0)    0%,
    rgba(0, 0, 0, 0)    38%,
    rgba(0, 0, 0, 0.45) 70%,
    rgba(0, 0, 0, 0.85) 100%
  );
  user-select: none;
`;

export const ModalContainer = styled.div`
  min-width: 400px;
  max-width: 500px;
  padding: 32px;
  position: relative;

  background: rgb(var(--surface-1));
  border: 1px solid var(--accent-border);
  border-radius: 14px;

  box-shadow:
    0 25px 50px -12px rgba(0, 0, 0, 0.7),
    0 0 40px var(--accent-glow),
    inset 0 1px 1px rgba(255, 255, 255, 0.04);

  animation: modalEnter 0.25s ease-out;

  @keyframes modalEnter {
    from { opacity: 0; transform: scale(0.96) translateY(8px); }
    to   { opacity: 1; transform: scale(1) translateY(0); }
  }

  p {
    font-size: 22px;
    font-weight: 400;
    color: rgb(var(--accent));
    text-align: center;
    margin: 0 0 12px 0;
    line-height: 1.3;
  }

  span {
    font-size: 14px;
    font-weight: 400;
    color: #a1a1aa;
    text-align: center;
    display: block;
    margin-bottom: 28px;
    line-height: 1.5;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;

  button {
    min-width: 120px;
    height: 44px;
    padding: 0 24px;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 14px;
    font-weight: 300;
    font-family: inherit;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    outline: none;
    cursor: pointer;
    transition: all 0.15s ease;

    /* Accept button (primary) */
    &:first-child {
      background: rgb(var(--accent));
      color: rgb(var(--accent-contrast));
      border-color: rgb(var(--accent));

      &:hover {
        background: rgb(var(--accent-hover));
        border-color: rgb(var(--accent-hover));
      }
    }

    /* Decline button (secondary) */
    &:last-child {
      background: rgba(255, 255, 255, 0.05);
      color: rgb(var(--accent));
      border-color: rgba(255, 255, 255, 0.08);

      &:hover {
        background: rgba(255, 255, 255, 0.09);
        border-color: rgba(255, 255, 255, 0.13);
        color: rgb(var(--accent));
      }
    }
  }
`;
