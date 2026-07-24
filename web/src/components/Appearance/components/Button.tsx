import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps {
  children: string | ReactNode;
  margin?: string;
  width?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'save';
  onClick: () => void;
}

const variants = {
  primary: css`
    background: rgb(var(--accent));
    color: rgb(var(--accent-contrast));
    border: 1px solid rgb(var(--accent));

    &:hover {
      background: rgb(var(--accent-hover));
      border-color: rgb(var(--accent-hover));
    }
  `,
  secondary: css`
    background: rgb(var(--surface-3));
    color: rgb(var(--accent));
    border: 1px solid rgba(255, 255, 255, 0.12);

    &:hover {
      background: rgb(var(--surface-5));
      border-color: rgba(255, 255, 255, 0.18);
    }
  `,
  danger: css`
    background: rgba(220, 38, 38, 0.15);
    color: #fecaca;
    border: 1px solid rgba(220, 38, 38, 0.35);

    &:hover {
      background: rgba(220, 38, 38, 0.25);
      border-color: rgba(220, 38, 38, 0.5);
      color: #fef2f2;
    }
  `,
  success: css`
    background: rgba(16, 185, 129, 0.15);
    color: #a7f3d0;
    border: 1px solid rgba(16, 185, 129, 0.35);

    &:hover {
      background: rgba(16, 185, 129, 0.25);
      border-color: rgba(16, 185, 129, 0.5);
      color: #d1fae5;
    }
  `,
  /* Primary action with a non-filled effect: neutral surface + accent outline,
     a light "shine" that sweeps across on hover, a soft accent glow, and a
     subtle lift. No solid colour fill. */
  save: css`
    position: relative;
    overflow: hidden;
    background: rgb(var(--surface-3));
    color: rgb(var(--accent));
    border: 1px solid rgba(var(--accent), 0.5);
    transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease,
      transform 0.2s ease;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -150%;
      width: 70%;
      height: 100%;
      background: linear-gradient(
        120deg,
        transparent,
        rgba(var(--accent), 0.22),
        transparent
      );
      transform: skewX(-20deg);
      transition: left 0.55s ease;
      pointer-events: none;
    }

    &:hover {
      background: rgb(var(--surface-5));
      border-color: rgb(var(--accent));
      box-shadow: 0 0 18px rgba(var(--accent), 0.28);
      transform: translateY(-1px);
    }
    &:hover::before {
      left: 150%;
    }
    &:active {
      transform: scale(0.98);
    }
  `,
};

const CustomButton = styled.button<ButtonProps>`
  padding: 16px 20px;
  margin: ${props => props?.margin || '0px'};
  width: ${props => props?.width || 'auto'};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  font-size: 15px;
  font-weight: 400;
  font-family: inherit;
  text-align: center;
  letter-spacing: 0.1px;

  border-radius: 12px;

  cursor: pointer;
  outline: none;
  transition: background 0.15s ease, border-color 0.15s ease;

  &:active { transform: scale(0.98); }
  &:disabled { opacity: 0.5; cursor: not-allowed; }

  ${props => variants[props.variant || 'secondary']}
`;

const Button = ({ children, onClick, margin, width, variant = 'secondary' }: ButtonProps) => (
  <CustomButton onClick={onClick} margin={margin} width={width} variant={variant}>
    {children}
  </CustomButton>
);

export default Button;
