import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { useTransition, animated } from 'react-spring';
import { Icon } from '@iconify/react';
import hatCowboy from '@iconify-icons/mdi/hat-fedora';
import tshirt from '@iconify-icons/mdi/tshirt-crew';
import socks from '@iconify-icons/mdi/foot-print';
import smile from '@iconify-icons/mdi/face-man';
import male from '@iconify-icons/mdi/human-male';
import shoePrints from '@iconify-icons/mdi/shoe-print';

import { CameraState, ClothesState, RotateState } from './interfaces';

interface ToggleButtonProps { active: boolean }
interface ToggleOptionProps { active: boolean; onClick: () => void; children?: ReactNode }
interface ExtendedOptionProps { icon: ReactElement; children?: ReactNode }

interface OptionsProps {
  visible: boolean;
  camera: CameraState;
  rotate: RotateState;
  clothes: ClothesState;
  handleSetClothes: (key: keyof ClothesState) => void;
  handleSetCamera: (key: keyof CameraState) => void;
  handleTurnAround: () => void;
  handleRotateLeft: () => void;
  handleRotateRight: () => void;
  handleSave: () => void;
  handleExit: () => void;
  enableExit: boolean;
}

const Container = styled(animated.div).attrs({ 'data-ui-panel': 'true' })`
  position: fixed;
  top: 50%;
  right: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;

  padding: 6px;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;

  background: rgb(var(--surface-3));
  border: 1px solid var(--accent-border);
  border-right: none;
  box-shadow:
    -12px 0 30px -8px rgba(0, 0, 0, 0.55),
    -8px 0 24px var(--accent-glow),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);

  z-index: 10;
`;

const ToggleButton = styled.button<ToggleButtonProps>`
  height: 44px;
  width: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: ${({ active }) => (active ? 'rgb(var(--accent))' : 'rgba(255, 255, 255, 0.05)')};
  color: ${({ active }) => (active ? 'rgb(var(--accent-contrast))' : 'rgb(var(--accent))')};
  border: 1px solid ${({ active }) => (active ? 'rgb(var(--accent))' : 'rgba(255, 255, 255, 0.08)')};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ active }) => (active ? 'rgb(var(--accent-hover))' : 'rgba(255, 255, 255, 0.10)')};
    border-color: ${({ active }) => (active ? 'rgb(var(--accent-hover))' : 'rgba(255, 255, 255, 0.14)')};
    color: ${({ active }) => (active ? 'rgb(var(--accent-contrast))' : 'rgb(var(--accent))')};
  }

  &:active { transform: scale(0.96); }
`;

const Option = styled.button`
  height: 44px;
  width: 44px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  color: rgb(var(--accent));
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.10);
    border-color: rgba(255, 255, 255, 0.14);
    color: rgb(var(--accent));
  }

  &:active { transform: scale(0.96); }
`;

const ExtendedContainer = styled.div`
  height: 44px;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 10px;
  overflow: visible;

  &:hover .extended-panel {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }
`;

const ExtendedIcon = styled.div`
  height: 48px;
  width: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: rgb(var(--accent));
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 0.10);
    border-color: rgba(255, 255, 255, 0.14);
    color: rgb(var(--accent));
  }
`;

const ExtendedPanel = styled.div`
  position: absolute;
  right: 51px;
  top: 0;
  height: 48px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;

  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 20;
`;

const TopBar = styled(animated.div).attrs({ 'data-ui-panel': 'true' })`
  position: fixed;
  top: 0;
  left: 50%;

  display: flex;
  align-items: center;
  gap: 6px;

  padding: 6px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;

  background: rgb(var(--surface-3));
  border: 1px solid var(--accent-border);
  border-top: none;
  box-shadow:
    0 12px 24px -8px rgba(0, 0, 0, 0.55),
    0 8px 24px var(--accent-glow),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);

  z-index: 10;
`;

const SaveButton = styled(Option)`
  background: rgb(var(--accent));
  color: rgb(var(--accent-contrast));
  border-color: rgb(var(--accent));

  &:hover {
    background: rgb(var(--accent-hover));
    border-color: rgb(var(--accent-hover));
    color: rgb(var(--accent-contrast));
  }
`;

const ToggleOption: React.FC<ToggleOptionProps> = ({ children, active, onClick }) => (
  <ToggleButton type="button" active={active} onClick={onClick}>
    {children}
  </ToggleButton>
);

const ExtendedOption: React.FC<ExtendedOptionProps> = ({ children, icon }) => (
  <ExtendedContainer>
    <ExtendedIcon>{icon}</ExtendedIcon>
    <ExtendedPanel className="extended-panel">{children}</ExtendedPanel>
  </ExtendedContainer>
);

const Options: React.FC<OptionsProps> = ({
  visible, camera, clothes,
  handleSetClothes, handleSetCamera,
}) => {
  const topTransition = useTransition(visible, null, {
    from:  { transform: 'translate(-50%, -180%)', opacity: 0 },
    enter: { transform: 'translate(-50%, 0%)', opacity: 1 },
    leave: { transform: 'translate(-50%, -180%)', opacity: 0 },
  });
  const sideTransition = useTransition(visible, null, {
    from:  { transform: 'translate(120%, -50%)', opacity: 0 },
    enter: { transform: 'translate(0%, -50%)', opacity: 1 },
    leave: { transform: 'translate(120%, -50%)', opacity: 0 },
  });

  return (
    <>
      {topTransition.map(({ item, key, props: style }) =>
        item && (
          <TopBar key={key} style={style}>
            <ToggleOption active={clothes.head} onClick={() => handleSetClothes('head')}>
              <Icon icon={hatCowboy} width={20} height={20} />
            </ToggleOption>
            <ToggleOption active={clothes.body} onClick={() => handleSetClothes('body')}>
              <Icon icon={tshirt} width={20} height={20} />
            </ToggleOption>
            <ToggleOption active={clothes.bottom} onClick={() => handleSetClothes('bottom')}>
              <Icon icon={socks} width={20} height={20} />
            </ToggleOption>
          </TopBar>
        ),
      )}
      {sideTransition.map(({ item, key, props: style }) =>
        item && (
          <Container key={key} style={style}>
            <ToggleOption active={camera.head} onClick={() => handleSetCamera('head')}>
              <Icon icon={smile} width={20} height={20} />
            </ToggleOption>
            <ToggleOption active={camera.body} onClick={() => handleSetCamera('body')}>
              <Icon icon={male} width={20} height={20} />
            </ToggleOption>
            <ToggleOption active={camera.bottom} onClick={() => handleSetCamera('bottom')}>
              <Icon icon={shoePrints} width={20} height={20} />
            </ToggleOption>
          </Container>
        ),
      )}
    </>
  );
};

export default Options;
