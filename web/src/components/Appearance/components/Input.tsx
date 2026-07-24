import { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { Icon } from '@iconify/react';
import chevronLeft from '@iconify-icons/mdi/chevron-left';
import chevronRight from '@iconify-icons/mdi/chevron-right';

interface InputProps {
  title?: string;
  min?: number;
  max?: number;
  blacklisted?: number[];
  defaultValue: number;
  clientValue: number;
  onChange: (value: number) => void;
}

const Container = styled.div<{ title?: string }>`
  min-width: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 8px;

  /* Just a label sitting directly above the stepper — no wrapping card. The
     stepper itself spans the full width of the section body. */
  > span {
    width: 100%;
    display: block;
    font-weight: 300;
    font-size: 14px;
    color: rgb(var(--accent));
    letter-spacing: 0.1px;
  }

  /* The stepper row: two square buttons flanking a wide recessed value box,
     each its own bordered cell with a small gap, spanning the full width. */
  > div {
    min-width: 0;
    height: 40px;
    display: flex;
    align-items: stretch;
    gap: 5px;

    button {
      flex: 0 0 40px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgb(var(--accent));
      outline: 0;
      cursor: pointer;

      background: rgb(var(--surface-4));
      border: 1px solid rgb(var(--border-surface));
      border-radius: 8px;
      transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

      &:hover {
        color: rgb(var(--accent));
        background: rgb(var(--surface-5));
        border-color: rgb(var(--border-strong));
      }

      &:active {
        transform: scale(0.94);
      }
    }

    .value {
      min-width: 0;
      flex: 1 1 auto;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      background: rgb(var(--surface-4));
      border: 1px solid rgb(var(--border-surface));
      border-radius: 8px;
      transition: border-color 0.15s ease, box-shadow 0.15s ease;

      /* Focused value box picks up the accent outline, like the reference. */
      &:focus-within {
        border-color: rgb(var(--accent));
        box-shadow: 0 0 0 1px rgb(var(--accent));
      }
    }

    input {
      min-width: 0;
      width: 100%;
      height: 100%;
      text-align: center;
      font-size: 15px;
      font-weight: 300;
      color: rgb(var(--accent));
      border: none;
      background: transparent;
      outline: none;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
`;

const Input: React.FC<InputProps> = ({
  title, min = 0, max = 255, blacklisted = [], defaultValue, clientValue, onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleContainerClick = useCallback(() => {
    if (inputRef.current) inputRef.current.focus();
  }, []);

  const isBlacklisted = (v: number, list: number[]) => list.includes(v);

  const normalize = (v: number) => {
    if (v < min) return max;
    if (v > max) return min;
    return v;
  };

  const checkBlacklisted = (v: number, list: number[], factor: number): number => {
    if (factor === 0) {
      if (!isBlacklisted(v, list)) return normalize(v);
      factor = v > defaultValue ? 1 : -1;
    }
    do { v = normalize(v + factor); } while (isBlacklisted(v, list));
    return v;
  };

  const getSafeValue = useCallback(
    (v: number, factor: number) => checkBlacklisted(v, blacklisted, factor),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [min, max, blacklisted],
  );

  const handleChange = useCallback(
    (raw: any, factor: number) => {
      let parsed;
      if (!raw && raw !== 0) return;
      if (Number.isNaN(raw)) return;
      if (typeof raw === 'string') parsed = parseInt(raw);
      else parsed = raw;
      onChange(getSafeValue(parsed, factor));
    },
    [getSafeValue, onChange],
  );

  return (
    <Container title={title} onClick={handleContainerClick}>
      <span>{title}</span>
      <div>
        <button type="button" onClick={() => handleChange(defaultValue, -1)}>
          <Icon icon={chevronLeft} width={20} height={20} />
        </button>
        <div className="value">
          <input type="number" ref={inputRef} value={defaultValue} onChange={e => handleChange(e.target.value, 0)} />
        </div>
        <button type="button" onClick={() => handleChange(defaultValue, 1)}>
          <Icon icon={chevronRight} width={20} height={20} />
        </button>
      </div>
    </Container>
  );
};

export default Input;
