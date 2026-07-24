import styled from 'styled-components';
import { useState, useCallback } from 'react';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  step?: number;
  onChange: (value: number) => void;
  label?: string;
  disabled?: boolean;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${(props: any) => props.theme.spacing?.sm || '8px'};
`;

const Label = styled.label`
  font-size: ${(props: any) => props.theme.typography?.fontSize?.sm || '14px'};
  font-weight: ${(props: any) => props.theme.typography?.fontWeight?.semibold || 600};
  color: ${(props: any) => props.theme.colors?.text?.primary || '#fef2f2'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.3px;
`;

const Value = styled.span`
  font-size: ${(props: any) => props.theme.typography?.fontSize?.sm || '14px'};
  font-weight: ${(props: any) => props.theme.typography?.fontWeight?.semibold || 600};
  color: ${(props: any) => props.theme.colors?.text?.primary || '#fef2f2'};
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.35) 0%, rgba(185, 28, 28, 0.3) 100%);
  padding: ${(props: any) => props.theme.spacing?.xs || '4px'} ${(props: any) => props.theme.spacing?.sm || '8px'};
  border-radius: ${(props: any) => props.theme.borderRadius?.md || '8px'};
  border: 1px solid rgba(220, 38, 38, 0.45);
  min-width: 40px;
  text-align: center;
  box-shadow:
    0 2px 6px rgba(0, 0, 0, 0.2),
    0 0 6px rgba(220, 38, 38, 0.25),
    inset 0 1px 1px rgba(255, 255, 255, 0.06);
`;

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  display: flex;
  align-items: center;
`;

const Track = styled.div`
  width: 100%;
  height: 6px;
  background: rgba(220, 38, 38, 0.15);
  border-radius: ${(props: any) => props.theme.borderRadius?.full || '9999px'};
  position: relative;
  overflow: hidden;
  box-shadow:
    inset 0 1px 3px rgba(0, 0, 0, 0.3),
    0 0 8px rgba(220, 38, 38, 0.2);
`;

const Progress = styled.div<{ percentage: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${props => props.percentage}%;
  background: linear-gradient(90deg,
    rgba(220, 38, 38, 0.9) 0%,
    rgba(185, 28, 28, 0.8) 100%
  );
  border-radius: ${(props: any) => props.theme.borderRadius?.full || '9999px'};
  transition: width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 0 8px rgba(220, 38, 38, 0.4);
`;

const Thumb = styled.div<{ percentage: number; disabled?: boolean }>`
  position: absolute;
  top: 50%;
  left: ${props => props.percentage}%;
  transform: translate(-50%, -50%);

  width: 18px;
  height: 18px;
  background: linear-gradient(145deg, rgba(220, 38, 38, 1) 0%, rgba(185, 28, 28, 1) 100%);
  border: 2.5px solid #fef2f2;
  border-radius: ${(props: any) => props.theme.borderRadius?.full || '9999px'};
  box-shadow:
    0 4px 8px rgba(0, 0, 0, 0.4),
    0 0 12px rgba(220, 38, 38, 0.5),
    inset 0 1px 1px rgba(255, 255, 255, 0.2);

  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &:hover {
    transform: translate(-50%, -50%) scale(${props => props.disabled ? 1 : 1.2});
    background: linear-gradient(145deg, rgba(239, 68, 68, 1) 0%, rgba(220, 38, 38, 1) 100%);
    box-shadow:
      0 6px 12px rgba(0, 0, 0, 0.5),
      0 0 20px rgba(220, 38, 38, 0.7),
      inset 0 1px 1px rgba(255, 255, 255, 0.3);
  }

  &:active {
    transform: translate(-50%, -50%) scale(${props => props.disabled ? 1 : 1.1});
  }

  ${props => props.disabled && `
    opacity: 0.4;
    background: rgba(100, 116, 139, 0.6);
    filter: grayscale(0.5);
  `}
`;

const HiddenInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  margin: 0;
  
  &:disabled {
    cursor: not-allowed;
  }
`;

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  value,
  step = 1,
  onChange,
  label,
  disabled = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const percentage = ((value - min) / (max - min)) * 100;
  
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  }, [onChange]);
  
  const handleMouseDown = useCallback(() => {
    if (!disabled) {
      setIsDragging(true);
    }
  }, [disabled]);
  
  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <Container>
      {label && (
        <Label>
          {label}
          <Value>{value}</Value>
        </Label>
      )}
      <SliderContainer>
        <Track>
          <Progress percentage={percentage} />
        </Track>
        <Thumb 
          percentage={percentage} 
          disabled={disabled}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
        <HiddenInput
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
      </SliderContainer>
    </Container>
  );
};
