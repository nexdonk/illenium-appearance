import styled from 'styled-components';
import { ReactNode } from 'react';

interface ItemProps {
  title?: string;
  children?: ReactNode;
}

const Container = styled.div`
  width: 100%;
  padding: 16px;
  background: rgb(var(--surface-1));
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  margin-bottom: 12px;
  transition: all 0.2s ease;

  &:hover {
    background: rgb(var(--surface-2));
    border-color: rgba(255, 255, 255, 0.10);
  }
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 300;
  color: rgb(var(--accent));
  line-height: 1.4;
  margin-bottom: 12px;
  display: block;
`;

const Inputs = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  > div { margin: 0; }
`;

const Item: React.FC<ItemProps> = ({ children, title }) => (
  <Container>
    {title && <Title>{title}</Title>}
    <Inputs>{children}</Inputs>
  </Container>
);

export default Item;
