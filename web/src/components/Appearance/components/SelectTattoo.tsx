import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { useNuiState } from '../../../hooks/nuiState';
import Button from './Button';
import RangeInput from './RangeInput';
import { Tattoo, TattoosSettings } from '../interfaces';

interface SelectTattooProps {
  items: Tattoo[];
  tattoosApplied: Tattoo[] | null;
  handleApplyTattoo: (value: Tattoo, opacity: number) => void;
  handlePreviewTattoo: (value: Tattoo, opacity: number) => void;
  handleDeleteTattoo: (value: Tattoo) => void;
  settings: TattoosSettings;
}

const Container = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 16px;

  > section {
    width: 100%;
    display: flex;
    justify-content: flex-end;
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
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.16)',
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
    maxHeight: '200px',
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
  }),
};

const SelectTattoo = ({
  items, tattoosApplied, handleApplyTattoo, handlePreviewTattoo, handleDeleteTattoo, settings,
}: SelectTattooProps) => {
  const defaultOpacity = 0.1;
  const selectRef = useRef<any>(null);
  const [currentTattoo, setCurrentTattoo] = useState<Tattoo>(items[0]);
  const [opacity, setOpacity] = useState<number>(defaultOpacity);
  const { label } = currentTattoo;
  const { locales } = useNuiState();

  const clientOpacity = useCallback(() => {
    if (!tattoosApplied) return defaultOpacity;
    const { name } = currentTattoo;
    for (let i = 0; i < tattoosApplied.length; i++) {
      if (tattoosApplied[i].name === name) return tattoosApplied[i].opacity ?? defaultOpacity;
    }
    return defaultOpacity;
  }, [currentTattoo, tattoosApplied])();

  useEffect(() => { setOpacity(clientOpacity); }, [clientOpacity]);

  const handleChange = (event: any, { action }: any): void => {
    if (action === 'select-option') {
      handlePreviewTattoo(event.value, opacity);
      setCurrentTattoo(event.value);
    }
  };

  const handleChangeOpacity = useCallback(
    (value: number) => {
      setOpacity(value);
      handlePreviewTattoo(currentTattoo, value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentTattoo],
  );

  const onMenuOpen = () => {
    setTimeout(() => {
      const el = document.getElementsByClassName('TattooDropdown' + items[0].zone + '__option--is-selected')[0];
      if (el) el.scrollIntoView({ behavior: 'auto', block: 'start', inline: 'nearest' });
    }, 100);
  };

  const isTattooApplied = useCallback(() => {
    if (!tattoosApplied) return false;
    const { name } = currentTattoo;
    return tattoosApplied.some(t => t.name === name);
  }, [tattoosApplied, currentTattoo])();

  if (!locales) return null;

  return (
    <Container>
      <Select
        ref={selectRef}
        styles={customStyles}
        options={items.map(item => ({ value: item, label: item.label }))}
        value={{ value: currentTattoo, label }}
        onChange={handleChange}
        onMenuOpen={onMenuOpen}
        className={'TattooDropdown' + items[0].zone}
        classNamePrefix={'TattooDropdown' + items[0].zone}
        menuPortalTarget={document.body}
        menuShouldScrollIntoView
      />
      <RangeInput
        title={locales.tattoos.opacity}
        min={settings.opacity.min}
        max={settings.opacity.max}
        factor={settings.opacity.factor}
        defaultValue={opacity}
        clientValue={clientOpacity}
        onChange={value => handleChangeOpacity(value)}
      />
      <section>
        {isTattooApplied ? (
          <Button onClick={() => handleDeleteTattoo(currentTattoo)} variant="danger">
            {locales.tattoos.delete}
          </Button>
        ) : (
          <Button onClick={() => handleApplyTattoo(currentTattoo, opacity)} variant="primary">
            {locales.tattoos.apply}
          </Button>
        )}
      </section>
    </Container>
  );
};

export default SelectTattoo;
