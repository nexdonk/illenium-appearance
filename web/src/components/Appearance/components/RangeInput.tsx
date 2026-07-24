import { useCallback, useRef } from 'react';
import styled from 'styled-components';

interface RangeInputProps {
  title?: string;
  min: number;
  max: number;
  factor?: number;
  defaultValue?: number;
  clientValue?: number;
  onChange: (value: number) => void;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.span`
  font-size: 14px;
  font-weight: 300;
  color: rgb(var(--accent));
  letter-spacing: 0.1px;
`;

const Value = styled.span`
  font-size: 13px;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.1px;
`;

const SliderContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledSlider = styled.input<{ percentage: number }>`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 4px;
  background: linear-gradient(
    to right,
    rgb(var(--accent)) 0%,
    rgb(var(--accent)) ${props => props.percentage}%,
    rgba(255, 255, 255, 0.08) ${props => props.percentage}%,
    rgba(255, 255, 255, 0.08) 100%
  );
  outline: none;
  border-radius: 9999px;
  transition: background 0.15s ease;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 14px;
    height: 14px;
    background: rgb(var(--accent));
    cursor: pointer;
    border-radius: 50%;
    border: none;
    transition: transform 0.15s ease;

    &:hover { transform: scale(1.15); }
  }

  &::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: rgb(var(--accent));
    cursor: pointer;
    border-radius: 50%;
    border: none;
  }
`;

const RangeInput: React.FC<RangeInputProps> = ({
  min, max, factor = 1, title, defaultValue = 1, onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const percentage = ((defaultValue - min) / (max - min)) * 100;

  const handleContainerClick = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const handleChange = useCallback(
    (e: { target: { value: string } }) => onChange(parseFloat(e.target.value)),
    [onChange],
  );

  return (
    <Container onClick={handleContainerClick}>
      <Header>
        <Title>{title || 'Setting'}</Title>
        <Value>{factor < 1 ? Number(defaultValue).toFixed(2) : defaultValue}</Value>
      </Header>
      <SliderContainer>
        <StyledSlider
          type="range"
          ref={inputRef}
          value={defaultValue}
          min={min}
          max={max}
          step={factor}
          percentage={percentage}
          onChange={handleChange}
        />
      </SliderContainer>
    </Container>
  );
};

export default RangeInput;
