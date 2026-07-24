import { useState, useEffect, useRef, ReactNode } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import chevronDown from '@iconify-icons/mdi/chevron-down';
import chevronUp from '@iconify-icons/mdi/chevron-up';
import { useSpring, animated } from 'react-spring';

interface SectionProps {
  title: string;
  deps?: any[];
  children?: ReactNode;
  onToggle?: (active: boolean) => void;
}

interface HeaderProps {
  active: boolean;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  user-select: none;

  & + & {
    margin-top: 8px;
  }
`;

const Header = styled.div<HeaderProps>`
  width: 100%;
  min-height: 44px;
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 11px 14px;

  background: ${({ active }: HeaderProps) =>
    active ? 'rgb(var(--surface-active))' : 'rgb(var(--surface-4))'};
  border: 1px solid rgb(var(--border-surface));

  /* When open, fuse the pill with the body below — bottom corners square and
     bottom border removed so the two share one outline. */
  border-radius: ${({ active }: HeaderProps) =>
    active ? '12px 12px 0 0' : '12px'};
  border-bottom: ${({ active }: HeaderProps) =>
    active ? 'none' : '1px solid rgb(var(--border-surface))'};

  transition: background 0.15s ease, border-color 0.15s ease;
  cursor: pointer;

  &:hover {
    background: ${({ active }: HeaderProps) =>
      active ? 'rgb(var(--surface-active-hover))' : 'rgb(var(--surface-inactive-hover))'};
  }

  span {
    font-size: 16px;
    font-weight: 400;
    color: rgb(var(--accent));
    letter-spacing: 0.1px;
  }
`;

/* The chevron lives in its own raised, bordered square button on the right of
   the header — a distinct layer that lifts off the header surface, matching the
   reference. */
const Chevron = styled.div<HeaderProps>`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    color: ${({ active }: HeaderProps) => (active ? 'rgb(var(--accent))' : '#a3a3a3')};
    transition: color 0.15s ease;
  }
`;

/* The body card sits flush against the bottom of the active Header (no gap,
   shared border). Its own background+border give it a clear container, like
   the reference shows. */
const ItemsWrapper = styled.div`
  background: rgb(var(--surface-1));
  border: 1px solid rgb(var(--border-surface));
  border-top: none;
  border-radius: 0 0 12px 12px;
`;

const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 14px;
`;

const Section: React.FC<SectionProps> = ({ children, title, deps = [], onToggle }) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const props = useSpring({
    height: active ? height : 0,
    opacity: active ? 1 : 0,
  });

  const toggle = () => {
    setActive(state => {
      const next = !state;
      onToggle?.(next);
      return next;
    });
  };

  useEffect(() => {
    if (ref.current) setHeight(ref.current.offsetHeight);
  }, [ref, setHeight]);

  useEffect(() => {
    if (ref.current) setHeight(ref.current.offsetHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, setHeight, deps]);

  return (
    <Container>
      <Header active={active} onClick={toggle}>
        <span>{title}</span>
        <Chevron active={active}>
          {active ? <Icon icon={chevronDown} width={20} height={20} /> : <Icon icon={chevronUp} width={20} height={20} />}
        </Chevron>
      </Header>

      <animated.div style={{ ...props, overflow: 'hidden' }}>
        <ItemsWrapper ref={ref}>
          <Items>{children}</Items>
        </ItemsWrapper>
      </animated.div>
    </Container>
  );
};

export default Section;
