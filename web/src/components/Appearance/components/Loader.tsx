import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const Wrapper = styled.div.attrs({ 'data-ui-panel': 'true' })`
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.55) 60%,
    rgba(0, 0, 0, 0.8) 100%
  );

  animation: ${fadeIn} 0.25s ease-out;
`;

const Spinner = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.12);
  border-top-color: rgb(var(--accent));
  animation: ${spin} 0.9s linear infinite;
  filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.25));
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: 400;
  color: rgb(var(--accent));
  letter-spacing: 0.24em;
  text-transform: uppercase;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9);
`;

const Loader = () => (
  <Wrapper>
    <Spinner />
    <Label>Loading</Label>
  </Wrapper>
);

export default Loader;
