import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import SelectInput from './components/SelectInput';

import { PedSettings } from './interfaces';

interface PedProps {
  settings: PedSettings;
  storedData: string;
  data: string;
  handleModelChange: (value: string) => void;
}

const FREEMODE_MALE = 'mp_m_freemode_01';
const FREEMODE_FEMALE = 'mp_f_freemode_01';

const CardsRow = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const CharacterCard = styled.button<{ selected: boolean }>`
  flex: 1;
  height: 220px;
  padding: 8px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgb(var(--surface-4));
  border: 1px solid rgb(var(--border-surface));
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;

  transition: background 0.15s ease, border-color 0.15s ease;

  &:hover {
    background: rgb(var(--surface-active-hover));
    border-color: rgb(var(--border-strong));
  }

  ${({ selected }) =>
    selected &&
    css`
      background: rgb(var(--surface-5));
      border-color: rgb(var(--accent));
    `}

  img {
    max-height: 100%;
    max-width: 100%;
    object-fit: contain;
    pointer-events: none;
    user-select: none;
  }
`;

const CustomPedLabel = styled.span`
  display: block;
  font-size: 14px;
  font-weight: 300;
  color: rgb(var(--accent));
  letter-spacing: 0.1px;
  margin-bottom: 10px;
`;

const Ped = ({ settings, storedData, data, handleModelChange }: PedProps) => {
  const { locales } = useNuiState();

  const { hasMale, hasFemale, customPeds, freemodeCount } = useMemo(() => {
    const items = settings.model.items || [];
    const _hasMale = items.includes(FREEMODE_MALE);
    const _hasFemale = items.includes(FREEMODE_FEMALE);
    const _customPeds = items.filter(
      p => p !== FREEMODE_MALE && p !== FREEMODE_FEMALE,
    );
    return {
      hasMale: _hasMale,
      hasFemale: _hasFemale,
      customPeds: _customPeds,
      freemodeCount: (_hasMale ? 1 : 0) + (_hasFemale ? 1 : 0),
    };
  }, [settings.model.items]);

  if (!locales) return null;

  const isCustom = data !== FREEMODE_MALE && data !== FREEMODE_FEMALE;
  const customValue = isCustom ? data : '';
  const customClient =
    storedData !== FREEMODE_MALE && storedData !== FREEMODE_FEMALE
      ? storedData
      : '';

  return (
    <Section title={`${locales.ped.title} (${freemodeCount})`}>
      {(hasMale || hasFemale) && (
        <CardsRow>
          {hasMale && (
            <CharacterCard
              type="button"
              selected={data === FREEMODE_MALE}
              onClick={() => handleModelChange(FREEMODE_MALE)}
              aria-label="Male freemode ped"
            >
              <img src="./images/mp_m_freemode_01.png" alt="Male freemode ped" draggable={false} />
            </CharacterCard>
          )}
          {hasFemale && (
            <CharacterCard
              type="button"
              selected={data === FREEMODE_FEMALE}
              onClick={() => handleModelChange(FREEMODE_FEMALE)}
              aria-label="Female freemode ped"
            >
              <img src="./images/mp_f_freemode_01.png" alt="Female freemode ped" draggable={false} />
            </CharacterCard>
          )}
        </CardsRow>
      )}
      {/* Always show the Custom Ped slot. If shared/peds.lua has nothing
          beyond the freemode models uncommented, react-select will render
          a 'No options' message on open. */}
      <div>
        <CustomPedLabel>Custom Ped</CustomPedLabel>
        <SelectInput
          title="CustomPed"
          hideTitle
          placeholder="Select"
          items={customPeds}
          defaultValue={customValue}
          clientValue={customClient}
          onChange={value => handleModelChange(value)}
        />
      </div>
    </Section>
  );
};

export default Ped;
