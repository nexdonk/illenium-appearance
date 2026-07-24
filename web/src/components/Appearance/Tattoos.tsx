import { useNuiState } from '../../hooks/nuiState';
import Section from './components/Section';
import { FlexWrapper } from './styles';
import SelectTattoo from './components/SelectTattoo';

import { TattoosSettings, TattooList, Tattoo } from './interfaces';
import Button from './components/Button';

interface TattoosProps {
  settings: TattoosSettings;
  data: TattooList;
  storedData: TattooList;
  handleApplyTattoo: (value: Tattoo, opacity: number) => void;
  handlePreviewTattoo: (value: Tattoo, opacity: number) => void;
  handleDeleteTattoo: (value: Tattoo) => void;
  handleClearTattoos: () => void;
}

const Tattoos = ({ settings, data, storedData, handleApplyTattoo, handlePreviewTattoo, handleDeleteTattoo, handleClearTattoos }: TattoosProps) => {
  const { locales } = useNuiState();

  const { items } = settings;
  const keys = Object.keys(items);

  if (!locales) {
    return null;
  }

  return (
    <>
      {keys.map(key => (
        key !== 'ZONE_HAIR' && (
          <Section key={key} title={locales.tattoos.items[key]}>
            <FlexWrapper>
              <SelectTattoo
                handlePreviewTattoo={handlePreviewTattoo}
                handleApplyTattoo={handleApplyTattoo}
                handleDeleteTattoo={handleDeleteTattoo}
                items={items[key]}
                tattoosApplied={data[key] ?? null}
                settings={settings}
              />
            </FlexWrapper>
          </Section>
        )
      ))}
      <div style={{ width: '100%', marginTop: 16 }}>
        <Button onClick={() => handleClearTattoos()} width="100%">{locales.tattoos.deleteAll}</Button>
      </div>
    </>
  );
};

export default Tattoos;
