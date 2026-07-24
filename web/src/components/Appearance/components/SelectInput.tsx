import { useRef } from 'react';
import styled from 'styled-components';
import Select from 'react-select';

interface SelectInputProps {
  title: string;
  items: string[];
  defaultValue: string;
  clientValue: string;
  onChange: (value: string) => void;
  /* When the caller renders its own external label, pass hideTitle to skip
     the internal title row entirely. */
  hideTitle?: boolean;
  placeholder?: string;
}

const Container = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  > span {
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-weight: 300;
    font-size: 14px;
    color: rgb(var(--accent));
    margin-bottom: 8px;

    small:last-child {
      color: rgb(var(--accent));
      background: rgba(255, 255, 255, 0.06);
      padding: 2px 8px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      font-weight: 300;
    }
  }
`;

const customStyles: any = {
  control: (s: any, { isFocused }: any) => ({
    ...s,
    background: isFocused ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
    fontSize: '14px',
    color: 'rgb(var(--accent))',
    border: `1px solid ${isFocused ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '10px',
    outline: 'none',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
    minHeight: '42px',
    transition: 'background 0.15s ease, border-color 0.15s ease',
    '&:hover': {
      background: isFocused ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.08)',
      border: `1px solid rgba(255,255,255,0.16)`,
    },
  }),
  placeholder: (s: any) => ({ ...s, fontSize: '14px', color: '#52525b' }),
  input: (s: any) => ({ ...s, fontSize: '14px', color: 'rgb(var(--accent))' }),
  singleValue: (s: any) => ({ ...s, fontSize: '14px', color: 'rgb(var(--accent))', fontWeight: 500 }),
  indicatorSeparator: () => ({ display: 'none' }),
  dropdownIndicator: (s: any) => ({
    ...s,
    color: '#71717a',
    padding: '8px',
    '&:hover': { color: 'rgb(var(--accent))' },
  }),
  menuPortal: (s: any) => ({ ...s, zIndex: 9999 }),
  menu: (s: any) => ({
    ...s,
    background: 'rgb(var(--surface-2))',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.6)',
    marginTop: '4px',
    overflow: 'hidden',
  }),
  menuList: (s: any) => ({
    ...s,
    background: 'transparent',
    borderRadius: '12px',
    padding: '6px',
    '&::-webkit-scrollbar': { width: '6px' },
    '&::-webkit-scrollbar-track': { background: 'transparent' },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(255,255,255,0.08)',
      borderRadius: '3px',
      '&:hover': { background: 'rgba(255,255,255,0.16)' },
    },
  }),
  option: (s: any, { isFocused, isSelected }: any) => ({
    ...s,
    borderRadius: '8px',
    margin: '2px 0',
    padding: '10px 12px',
    fontSize: '14px',
    fontWeight: 500,
    color: isSelected ? 'rgb(var(--accent))' : '#a1a1aa',
    background: isSelected
      ? 'rgba(255,255,255,0.10)'
      : isFocused
      ? 'rgba(255,255,255,0.05)'
      : 'transparent',
    cursor: 'pointer',
    '&:active': { background: 'rgba(255,255,255,0.12)' },
  }),
};

const SelectInput = ({
  title,
  items,
  defaultValue,
  clientValue,
  onChange,
  hideTitle,
  placeholder,
}: SelectInputProps) => {
  const selectRef = useRef<any>(null);

  const handleChange = (event: any, { action }: any): void => {
    if (action === 'select-option') onChange(event.value);
  };

  const onMenuOpen = () => {
    setTimeout(() => {
      const el = document.getElementsByClassName('Select' + title + '__option--is-selected')[0];
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
    }, 100);
  };

  const selectValue = defaultValue
    ? { value: defaultValue, label: defaultValue }
    : null;

  return (
    <Container>
      {!hideTitle && (
        <span>
          <small>{title}</small>
          <small>{clientValue}</small>
        </span>
      )}
      <Select
        ref={selectRef}
        styles={customStyles}
        options={items.map(item => ({ value: item, label: item }))}
        value={selectValue}
        onChange={handleChange}
        onMenuOpen={onMenuOpen}
        placeholder={placeholder || 'Select'}
        className={'Select' + title}
        classNamePrefix={'Select' + title}
        menuPortalTarget={document.body}
      />
    </Container>
  );
};

export default SelectInput;
