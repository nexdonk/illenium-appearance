import styled from 'styled-components';
import { Theme } from '../../styles/theme';

interface CardProps {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: keyof Theme['spacing'];
}

export const Card = styled.div<CardProps>`
  background: linear-gradient(
    135deg,
    rgba(220, 38, 38, 0.2) 0%,
    rgba(185, 28, 28, 0.15) 100%
  );
  border-radius: ${props => props.theme.borderRadius.lg};
  padding: ${props => props.padding ? props.theme.spacing[props.padding] : props.theme.spacing.md};
  transition: all ${props => props.theme.animation.duration.normal} ${props => props.theme.animation.easing.smooth};
  position: relative;

  border: 1px solid rgba(220, 38, 38, 0.35);

  ${props => props.variant === 'elevated' && `
    box-shadow:
      ${props.theme.shadows.md},
      0 0 12px rgba(220, 38, 38, 0.15),
      inset 0 1px 1px rgba(255, 255, 255, 0.05);

    &:hover {
      box-shadow:
        ${props.theme.shadows.lg},
        0 0 20px rgba(220, 38, 38, 0.25),
        inset 0 1px 1px rgba(255, 255, 255, 0.08);
      transform: translateY(-2px);
      border-color: rgba(220, 38, 38, 0.3);
    }
  `}

  ${props => props.variant === 'outlined' && `
    border: 1px solid ${props.theme.colors.border};
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.2),
      0 0 8px rgba(220, 38, 38, 0.1);

    &:hover {
      border-color: ${props.theme.colors.borderHover};
      box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.3),
        0 0 12px rgba(220, 38, 38, 0.15);
    }
  `}

  ${props => props.variant === 'default' && `
    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.2),
      0 0 8px rgba(220, 38, 38, 0.2),
      inset 0 1px 1px rgba(255, 255, 255, 0.04);

    &:hover {
      background: linear-gradient(
        135deg,
        rgba(220, 38, 38, 0.25) 0%,
        rgba(185, 28, 28, 0.2) 100%
      );
      box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.3),
        0 0 12px rgba(220, 38, 38, 0.3),
        inset 0 1px 1px rgba(255, 255, 255, 0.06);
    }
  `}

  & + & {
    margin-top: ${props => props.theme.spacing.sm};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.md};
  padding-bottom: ${props => props.theme.spacing.sm};
  border-bottom: 1px solid rgba(220, 38, 38, 0.25);
  position: relative;

  /* Red glow line effect */
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(220, 38, 38, 0.4) 50%,
      transparent 100%
    );
  }
`;

export const CardTitle = styled.h3`
  font-size: ${props => props.theme.typography.fontSize.lg};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: ${props => props.theme.colors.text.primary};
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 0.3px;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;
