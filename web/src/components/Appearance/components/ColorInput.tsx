import { useCallback } from 'react';
import styled, { css } from 'styled-components';

interface ColorInputProps {
  title?: string;
  colors?: number[][];
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
}

interface ButtonProps {
  selected: boolean;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* Label directly above the swatch grid — no wrapping card. The grid box is the
     only bordered container, spanning the full width of the section body. */
  > span {
    width: 100%;
    display: block;
    font-size: 14px;
    font-weight: 300;
    color: rgb(var(--accent));
    letter-spacing: 0.1px;
  }

  > div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 4px;

    padding: 10px;
    background: rgb(var(--surface-4));
    border: 1px solid rgb(var(--border-surface));
    border-radius: 8px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.35);
  }
`;

const Button = styled.button<ButtonProps>`
  height: 16px;
  width: 16px;
  border-radius: 4px;
  border: 2px solid transparent;
  cursor: pointer;
  transition: transform 0.12s ease, border-color 0.12s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);

  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    transform: scale(1.12);
  }

  ${({ selected }) =>
    selected &&
    css`
      border-color: rgb(var(--accent));
    `}
`;

const ColorInput: React.FC<ColorInputProps> = ({ title, colors = [], defaultValue, clientValue, onChange }) => {
  const selectColor = useCallback((color: number) => onChange(color), [onChange]);

  return (
    <Container>
      <span>{title}</span>
      <div>
        {colors.map((color, index) => (
          <Button
            key={index}
            style={{ backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]})` }}
            selected={defaultValue === index}
            onClick={() => selectColor(index)}
          />
        ))}
      </div>
    </Container>
  );
};

export default ColorInput;
