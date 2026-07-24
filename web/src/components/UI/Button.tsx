import styled, { css } from 'styled-components';
import { Theme } from '../../styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
}

const buttonVariants = {
  primary: css`
    background: linear-gradient(135deg, rgba(220, 38, 38, 0.95) 0%, rgba(185, 28, 28, 0.9) 100%);
    color: #fef2f2;
    border: 1px solid rgba(220, 38, 38, 0.6);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    font-weight: 600;
    letter-spacing: 0.3px;

    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.4),
      0 0 16px rgba(220, 38, 38, 0.4),
      inset 0 1px 2px rgba(255, 255, 255, 0.1);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, rgba(239, 68, 68, 1) 0%, rgba(220, 38, 38, 0.95) 100%);
      border-color: rgba(239, 68, 68, 0.7);
      transform: translateY(-2px);
      box-shadow:
        0 8px 20px rgba(0, 0, 0, 0.5),
        0 0 24px rgba(220, 38, 38, 0.6),
        inset 0 1px 2px rgba(255, 255, 255, 0.15);
    }

    &:active {
      transform: translateY(0);
      box-shadow:
        0 2px 8px rgba(0, 0, 0, 0.4),
        0 0 12px rgba(220, 38, 38, 0.4),
        inset 0 1px 2px rgba(255, 255, 255, 0.1);
    }
  `,

  secondary: css`
    background: linear-gradient(135deg, rgba(220, 38, 38, 0.25) 0%, rgba(185, 28, 28, 0.2) 100%);
    color: ${(props: any) => props.theme.colors.text.primary};
    border: 1px solid ${(props: any) => props.theme.colors.border};
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    box-shadow:
      0 2px 8px rgba(0, 0, 0, 0.3),
      0 0 8px rgba(220, 38, 38, 0.2),
      inset 0 1px 1px rgba(255, 255, 255, 0.05);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, rgba(220, 38, 38, 0.3) 0%, rgba(185, 28, 28, 0.25) 100%);
      border-color: ${(props: any) => props.theme.colors.borderHover};
      transform: translateY(-2px);
      box-shadow:
        0 4px 12px rgba(0, 0, 0, 0.4),
        0 0 12px rgba(220, 38, 38, 0.3),
        inset 0 1px 1px rgba(255, 255, 255, 0.08);
    }
  `,

  ghost: css`
    background: transparent;
    color: ${(props: any) => props.theme.colors.text.secondary};
    border: 1px solid transparent;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(185, 28, 28, 0.15) 100%);
      color: ${(props: any) => props.theme.colors.text.primary};
      border-color: rgba(220, 38, 38, 0.3);
      transform: translateY(-1px);
      box-shadow:
        0 2px 8px rgba(0, 0, 0, 0.2),
        0 0 8px rgba(220, 38, 38, 0.25);
    }
  `,

  danger: css`
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.95) 0%, rgba(220, 38, 38, 0.9) 100%);
    color: #fef2f2;
    border: 1px solid rgba(239, 68, 68, 0.6);
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    font-weight: 600;

    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.4),
      0 0 16px rgba(239, 68, 68, 0.5),
      inset 0 1px 2px rgba(255, 255, 255, 0.1);

    &:hover:not(:disabled) {
      background: linear-gradient(135deg, rgba(248, 113, 113, 1) 0%, rgba(239, 68, 68, 1) 100%);
      transform: translateY(-2px);
      box-shadow:
        0 8px 20px rgba(0, 0, 0, 0.5),
        0 0 28px rgba(239, 68, 68, 0.7),
        inset 0 1px 2px rgba(255, 255, 255, 0.15);
    }
  `
};

const buttonSizes = {
  sm: css`
    padding: ${(props: any) => props.theme.spacing.sm} ${(props: any) => props.theme.spacing.md};
    font-size: ${(props: any) => props.theme.typography.fontSize.sm};
    height: 32px;
  `,
  
  md: css`
    padding: ${(props: any) => props.theme.spacing.sm} ${(props: any) => props.theme.spacing.lg};
    font-size: ${(props: any) => props.theme.typography.fontSize.base};
    height: 40px;
  `,
  
  lg: css`
    padding: ${(props: any) => props.theme.spacing.md} ${(props: any) => props.theme.spacing.xl};
    font-size: ${(props: any) => props.theme.typography.fontSize.lg};
    height: 48px;
  `
};

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(props: any) => props.theme.spacing.sm};
  position: relative;

  border: none;
  border-radius: ${(props: any) => props.theme.borderRadius.lg};

  font-family: inherit;
  font-weight: ${(props: any) => props.theme.typography.fontWeight.medium};

  cursor: pointer;
  transition: all ${(props: any) => props.theme.animation.duration.normal} ${(props: any) => props.theme.animation.easing.smooth};

  &:focus {
    outline: 2px solid ${(props: any) => props.theme.colors.primary};
    outline-offset: 2px;
    box-shadow:
      0 0 0 4px rgba(220, 38, 38, 0.2);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none !important;
    filter: grayscale(0.3);
  }

  ${(props: ButtonProps) => buttonVariants[props.variant || 'primary']}
  ${(props: ButtonProps) => buttonSizes[props.size || 'md']}

  ${(props: any) => props.fullWidth && css`
    width: 100%;
  `}
`;

export const IconButton = styled(Button)`
  padding: ${(props: any) => props.theme.spacing.sm};
  width: 40px;
  height: 40px;
  
  ${(props: any) => props.size === 'sm' && css`
    width: 32px;
    height: 32px;
    padding: ${props.theme.spacing.xs};
  `}
  
  ${(props: any) => props.size === 'lg' && css`
    width: 48px;
    height: 48px;
    padding: ${props.theme.spacing.md};
  `}
`;
