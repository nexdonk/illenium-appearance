import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTransition as useTransitionAnimation, animated } from 'react-spring';
import { useNuiState } from '../../hooks/nuiState';
import Nui from '../../Nui';
import mock from '../../mock';

import {
  CustomizationConfig,
  PedAppearance,
  AppearanceSettings,
  PedHeadBlend,
  PedFaceFeatures,
  PedHeadOverlays,
  PedHeadOverlayValue,
  PedHair,
  CameraState,
  ClothesState,
  Tattoo,
  TattoosSettings,
} from './interfaces';

import {
  APPEARANCE_INITIAL_STATE,
  SETTINGS_INITIAL_STATE,
  CAMERA_INITIAL_STATE,
  ROTATE_INITIAL_STATE,
  CLOTHES_INITIAL_STATE,
} from './settings';

import Loader from './components/Loader';
import Button from './components/Button';
import Ped from './Ped';
import HeadBlend from './HeadBlend';
import FaceFeatures from './FaceFeatures';
import HeadOverlays from './HeadOverlays';
import Components from './Components';
import Props from './Props';
import Options from './Options';
import Tattoos from './Tattoos';
import ImportExport from './ImportExport';

import { Icon } from '@iconify/react';
import userPen from '@iconify-icons/mdi/account-edit';
import userRound from '@iconify-icons/mdi/account';
import smile from '@iconify-icons/mdi/face-man';
import slidersHorizontal from '@iconify-icons/mdi/tune';
import shirtIcon from '@iconify-icons/mdi/tshirt-crew';
import gem from '@iconify-icons/mdi/diamond-stone';
import paintbrush from '@iconify-icons/mdi/brush';
import scissors from '@iconify-icons/mdi/content-cut';
import palette from '@iconify-icons/mdi/palette';
import dna from '@iconify-icons/mdi/dna';
import save from '@iconify-icons/mdi/swap-horizontal';
import {
  Wrapper,
  Vignette,
  Container,
  PanelGroup,
  LeftColumn,
  OuterFrame,
  HeaderCard,
  TabRail,
  TabButton,
  TabLabel,
  PanelHeaderIcon,
  PanelHeaderText,
  PanelHeaderTitle,
  PanelHeaderSubtitle,
  PanelBody,
  PanelFooter,
  ImportExportLauncher,
  LauncherDock,
} from './styles';

type TabId =
  | 'character'
  | 'face'
  | 'features'
  | 'skin'
  | 'hair'
  | 'makeup'
  | 'tattoos'
  | 'clothing'
  | 'accessories';

if (!import.meta.env.PROD) {
  mock('nex_appearance_get_settings', async () => ({
    appearanceSettings: {
      ...SETTINGS_INITIAL_STATE,
      eyeColor: { min: 0, max: 24 },
      hair: {
        ...SETTINGS_INITIAL_STATE.hair,
        color: {
          items: [
            [255, 0, 0],
            [0, 255, 0],
            [0, 0, 255],
            [0, 0, 255],
          ],
        },
      },
    },
  }));

  mock('nex_appearance_get_data', async () => ({
    config: {
      ped: true,
      headBlend: true,
      faceFeatures: true,
      headOverlays: true,
      components: true,
      componentConfig: {
        masks: true,
        upperBody: true,
        lowerBody: true,
        bags: true,
        shoes: true,
        scarfAndChains: true,
        shirts: true,
        bodyArmor: true,
        decals: true,
        jackets: true,
      },
      props: true,
      propConfig: {
        hats: true,
        glasses: true,
        ear: true,
        watches: true,
        bracelets: true,
      },
      tattoos: true,
      enableExit: true,
      hasTracker: false,
      automaticFade: false,
    },
    appearanceData: { ...APPEARANCE_INITIAL_STATE, model: 'mp_f_freemode_01' },
  }));

  mock('nex_appearance_change_model', () => SETTINGS_INITIAL_STATE);

  mock('nex_appearance_change_component', () => SETTINGS_INITIAL_STATE.components);

  mock('nex_appearance_change_prop', () => SETTINGS_INITIAL_STATE.props);
}

const Appearance = () => {
  const [config, setConfig] = useState<CustomizationConfig>();

  const [data, setData] = useState<PedAppearance>();
  const [storedData, setStoredData] = useState<PedAppearance>();
  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>();

  const [camera, setCamera] = useState(CAMERA_INITIAL_STATE);
  const [rotate, setRotate] = useState(ROTATE_INITIAL_STATE);
  const [clothes, setClothes] = useState(CLOTHES_INITIAL_STATE);

  const [exiting, setExiting] = useState(false);
  const [minLoaderElapsed, setMinLoaderElapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('character');
  const [importExportOpen, setImportExportOpen] = useState(false);

  const { display, setDisplay, locales, setLocales, setAccent } = useNuiState();

  const dataReady = !!(config && appearanceSettings && data && storedData && locales);
  // `exiting` no longer gates the loader — flashing the spinner on save/cancel
  // was the "save caching" lag people were seeing. We just snap the panel out
  // and let Lua finish in the background.
  const showLoader = display.appearance && (!dataReady || !minLoaderElapsed);
  const showMainUi = display.appearance && dataReady && minLoaderElapsed && !exiting;

  const loaderTransition = useTransitionAnimation(showLoader, null, {
    from:  { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  // Short duration on the vignette + panel transitions so save/cancel feels
  // instant. React-spring's default spring gives ~600ms which is what made
  // exits feel laggy.
  const vignetteTransition = useTransitionAnimation(showMainUi, null, {
    from:  { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 140 },
  });

  const leftPanelTransition = useTransitionAnimation(showMainUi, null, {
    from:  { transform: 'translateX(-115%)', opacity: 0 },
    enter: { transform: 'translateX(0%)', opacity: 1 },
    leave: { transform: 'translateX(-115%)', opacity: 0 },
    config: { duration: 160 },
  });

  const launcherTransition = useTransitionAnimation(showMainUi, null, {
    from:   { transform: 'translateX(-50%) translateY(140%)', opacity: 0 },
    enter:  { transform: 'translateX(-50%) translateY(0%)',   opacity: 1 },
    leave:  { transform: 'translateX(-50%) translateY(140%)', opacity: 0 },
    config: { duration: 140 },
  });

  // Backdrop snaps in fast so the editor underneath is hidden before the modal
  // starts fading in — prevents the brief "see through" overlap.
  const importExportBackdropTransition = useTransitionAnimation(importExportOpen, null, {
    from:   { opacity: 0 },
    enter:  { opacity: 1 },
    leave:  { opacity: 0 },
    config: { duration: 60 },
  });

  const importExportTransition = useTransitionAnimation(importExportOpen, null, {
    from:   { opacity: 0, transform: 'scale(0.97)' },
    enter:  { opacity: 1, transform: 'scale(1)' },
    leave:  { opacity: 0, transform: 'scale(0.97)' },
    config: { duration: 160 },
  });

  const handleTurnAround = useCallback(() => {
    Nui.post('nex_appearance_turn_around');
  }, []);

  const handleSetClothes = useCallback(
    (key: keyof ClothesState) => {
      setClothes({ ...clothes, [key]: !clothes[key] });
      if (!clothes[key]) {
        Nui.post('nex_appearance_remove_clothes', key);
      } else {
        Nui.post('nex_appearance_wear_clothes', { data, key });
      }
    },
    [data, clothes, setClothes],
  );

  const handleSetCamera = useCallback(
    (key: keyof CameraState) => {
      setCamera({ ...CAMERA_INITIAL_STATE, [key]: !camera[key] });
      setRotate(ROTATE_INITIAL_STATE);

      if (!camera[key]) {
        Nui.post('nex_appearance_set_camera', key);
      } else {
        Nui.post('nex_appearance_set_camera', 'default');
      }
    },
    [camera, setCamera, setRotate],
  );

  const handleRotateLeft = useCallback(() => {
    setRotate({ left: !rotate.left, right: false });

    if (!rotate.left) {
      Nui.post('nex_appearance_rotate_camera', 'left');
    } else {
      Nui.post('nex_appearance_set_camera', 'current');
    }
  }, [setRotate, rotate]);

  const handleRotateRight = useCallback(() => {
    setRotate({ left: false, right: !rotate.right });

    if (!rotate.right) {
      Nui.post('nex_appearance_rotate_camera', 'right');
    } else {
      Nui.post('nex_appearance_set_camera', 'current');
    }
  }, [setRotate, rotate]);

  const handleSave = useCallback(async () => {
    // Hide the UI right away so the panel starts sliding out the instant the
    // user clicks Save. Lua still runs the save in the background — we don't
    // need to wait for it to update the UI.
    setExiting(true);
    setDisplay({ appearance: false, asynchronous: false });
    Nui.post('nex_appearance_save', data);
  }, [data, setDisplay]);

  const handleImportData = useCallback(async (imported: PedAppearance) => {
    if (imported.model && data && imported.model !== data.model) {
      const { appearanceSettings: nextSettings, appearanceData: nextData } = await Nui.post(
        'nex_appearance_change_model',
        imported.model,
      );
      setAppearanceSettings(nextSettings);
      setData({ ...nextData, ...imported });
    } else {
      setData(imported);
    }
    await Nui.post('nex_appearance_load', imported);
    // Leave the modal open so the success pill is visible — the user dismisses
    // the panel themselves when they're ready.
  }, [data, setData, setAppearanceSettings]);

  const handleExit = useCallback(async () => {
    // Same as save — drop the panel right away so cancel feels instant. Lua
    // will tear down the camera and restore the ped in the background.
    setExiting(true);
    setDisplay({ appearance: false, asynchronous: false });
    Nui.post('nex_appearance_exit');
  }, [setDisplay]);

  const handleModelChange = useCallback(
    async (value: string) => {
      const { appearanceSettings: _appearanceSettings, appearanceData } = await Nui.post(
        'nex_appearance_change_model',
        value,
      );

      setAppearanceSettings(_appearanceSettings);
      setData(appearanceData);
    },
    [setData, setAppearanceSettings],
  );

  const handleHeadBlendChange = useCallback(
    (key: keyof PedHeadBlend, value: number) => {
      if (!data) return;

      const updatedHeadBlend = { ...data.headBlend, [key]: value };

      const updatedData = { ...data, headBlend: updatedHeadBlend };

      setData(updatedData);

      Nui.post('nex_appearance_change_head_blend', updatedHeadBlend);
    },
    [data, setData],
  );

  const handleFaceFeatureChange = useCallback(
    (key: keyof PedFaceFeatures, value: number) => {
      if (!data) return;

      const updatedFaceFeatures = { ...data.faceFeatures, [key]: value };

      const updatedData = { ...data, faceFeatures: updatedFaceFeatures };

      setData(updatedData);

      Nui.post('nex_appearance_change_face_feature', updatedFaceFeatures);
    },
    [data, setData],
  );

  const handleHairChange = useCallback(
    async (key: keyof PedHair, value: number) => {
      if (!data || !appearanceSettings) return;

      const updatedHair = { ...data.hair, [key]: value };

      const updatedData = { ...data, hair: updatedHair };

      setData(updatedData);

      const updatedHairSettings = await Nui.post('nex_appearance_change_hair', updatedHair);

      const updatedSettings = { ...appearanceSettings, hair: updatedHairSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handleChangeFade = useCallback(async (value: number) => {
    if (!data || !appearanceSettings) return;
      const { tattoos } = data;
      const updatedTattoos = { ...tattoos };
      const tattoo = appearanceSettings.tattoos.items['ZONE_HAIR'][value]
      if (!updatedTattoos[tattoo.zone]) updatedTattoos[tattoo.zone] = [];
      updatedTattoos[tattoo.zone] = [tattoo];
      await Nui.post('nex_appearance_apply_tattoo', updatedTattoos);
      setData({ ...data, tattoos: updatedTattoos });
  }, [appearanceSettings, data, setData])

  const handleHeadOverlayChange = useCallback(
    (key: keyof PedHeadOverlays, option: keyof PedHeadOverlayValue, value: number) => {
      if (!data) return;

      const updatedValue = { ...data.headOverlays[key], [option]: value };

      const updatedData = { ...data, headOverlays: { ...data.headOverlays, [key]: updatedValue } };

      setData(updatedData);

      Nui.post('nex_appearance_change_head_overlay', { ...data.headOverlays, [key]: updatedValue });
    },
    [data, setData],
  );

  const handleEyeColorChange = useCallback(
    (value: number) => {
      if (!data) return;

      const updatedData = { ...data, eyeColor: value };

      setData(updatedData);

      Nui.post('nex_appearance_change_eye_color', value);
    },
    [data, setData],
  );

  const handleComponentDrawableChange = useCallback(
    async (component_id: number, drawable: number) => {
      if (!data || !appearanceSettings) return;

      const component = data.components.find(c => c.component_id === component_id);

      if (!component) return;

      const updatedComponent = { ...component, drawable, texture: 0 };

      const filteredComponents = data.components.filter(c => c.component_id !== component_id);

      const updatedComponents = [...filteredComponents, updatedComponent];

      const updatedData = { ...data, components: updatedComponents };

      setData(updatedData);

      const updatedComponentSettings = await Nui.post('nex_appearance_change_component', updatedComponent);

      const filteredComponentsSettings = appearanceSettings.components.filter(c => c.component_id !== component_id);

      const updatedComponentsSettings = [...filteredComponentsSettings, updatedComponentSettings];

      const updatedSettings = { ...appearanceSettings, components: updatedComponentsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handleComponentTextureChange = useCallback(
    async (component_id: number, texture: number) => {
      if (!data || !appearanceSettings) return;

      const component = data.components.find(c => c.component_id === component_id);

      if (!component) return;

      const updatedComponent = { ...component, texture };

      const filteredComponents = data.components.filter(c => c.component_id !== component_id);

      const updatedComponents = [...filteredComponents, updatedComponent];

      const updatedData = { ...data, components: updatedComponents };

      setData(updatedData);

      const updatedComponentSettings = await Nui.post('nex_appearance_change_component', updatedComponent);

      const filteredComponentsSettings = appearanceSettings.components.filter(c => c.component_id !== component_id);

      const updatedComponentsSettings = [...filteredComponentsSettings, updatedComponentSettings];

      const updatedSettings = { ...appearanceSettings, components: updatedComponentsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handlePropDrawableChange = useCallback(
    async (prop_id: number, drawable: number) => {
      if (!data || !appearanceSettings) return;

      const prop = data.props.find(p => p.prop_id === prop_id);

      if (!prop) return;

      const updatedProp = { ...prop, drawable, texture: 0 };

      const filteredProps = data.props.filter(p => p.prop_id !== prop_id);

      const updatedProps = [...filteredProps, updatedProp];

      const updatedData = { ...data, props: updatedProps };

      setData(updatedData);

      const updatedPropSettings = await Nui.post('nex_appearance_change_prop', updatedProp);

      const filteredPropsSettings = appearanceSettings.props.filter(c => c.prop_id !== prop_id);

      const updatedPropsSettings = [...filteredPropsSettings, updatedPropSettings];

      const updatedSettings = { ...appearanceSettings, props: updatedPropsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handlePropTextureChange = useCallback(
    async (prop_id: number, texture: number) => {
      if (!data || !appearanceSettings) return;

      const prop = data.props.find(p => p.prop_id === prop_id);

      if (!prop) return;

      const updatedProp = { ...prop, texture };

      const filteredProps = data.props.filter(p => p.prop_id !== prop_id);

      const updatedProps = [...filteredProps, updatedProp];

      const updatedData = { ...data, props: updatedProps };

      setData(updatedData);

      const updatedPropSettings = await Nui.post('nex_appearance_change_prop', updatedProp);

      const filteredPropsSettings = appearanceSettings.props.filter(c => c.prop_id !== prop_id);

      const updatedPropsSettings = [...filteredPropsSettings, updatedPropSettings];

      const updatedSettings = { ...appearanceSettings, props: updatedPropsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const isPedFreemodeModel = useMemo(() => {
    if (!data) return;

    return data.model === 'mp_m_freemode_01' || data.model === 'mp_f_freemode_01';
  }, [data]);

  const isPedMale = useMemo(() => {
    if(!data) return;

    if (data.model === 'mp_m_freemode_01') {
      return true;
    }

    return false
  }, [data]);

  const filterTattoos = (tattooSettings: TattoosSettings) => {
    for(const zone in tattooSettings.items) {
      tattooSettings.items[zone] = tattooSettings.items[zone].filter(tattoo => {
        if(isPedMale && tattoo.hashMale !== "") {
          return tattoo;
        } else if(!isPedMale && tattoo.hashFemale !== "") {
          return tattoo;
        }
      })
    }
    return tattooSettings;
  };

  const handleApplyTattoo = useCallback(
    async (tattoo: Tattoo, opacity: number) => {
      if (!data) return;
      tattoo.opacity = opacity;
      const { tattoos } = data;
      const updatedTattoos = JSON.parse(JSON.stringify({ ...tattoos}));
      if (!updatedTattoos[tattoo.zone]) updatedTattoos[tattoo.zone] = [];
      updatedTattoos[tattoo.zone].push(tattoo);
      const applied = await Nui.post('nex_appearance_apply_tattoo', {tattoo, updatedTattoos});
      if(applied) {
        setData({ ...data, tattoos: updatedTattoos });
      }
    },
    [data, setData],
  );

  const handlePreviewTattoo = useCallback(
    (tattoo: Tattoo, opacity: number) => {
      if (!data) return;
      tattoo.opacity = opacity;
      const { tattoos } = data;
      Nui.post('nex_appearance_preview_tattoo', { data: tattoos, tattoo });
    },
    [data],
  );

  const handleDeleteTattoo = useCallback(
    async (tattoo: Tattoo) => {
      if (!data) return;
      const { tattoos } = data;
      const updatedTattoos = tattoos;
      updatedTattoos[tattoo.zone] = updatedTattoos[tattoo.zone].filter(tattooDelete => tattooDelete.name !== tattoo.name);
      await Nui.post('nex_appearance_delete_tattoo', updatedTattoos);
      setData({ ...data, tattoos: updatedTattoos });
    },
    [data, setData],
  );

  const handleClearTattoos = useCallback(
    async () => {
      if (!data) return;
      const { tattoos } = data;
      const updatedTattoos = { ...tattoos };
      for (var zone in updatedTattoos) {
        if (zone !== "ZONE_HAIR") {
          updatedTattoos[zone] = [];
        }
      }
      await Nui.post('nex_appearance_delete_tattoo', updatedTattoos);
      setData({ ...data, tattoos: updatedTattoos });
    },
    [data, setData],
  );

  // Gyro drag: click + drag the viewport to rotate the ped 360°.
  // Mouse delta is converted to a heading delta (degrees) and posted
  // to a lightweight Lua handler that calls SetEntityHeading directly.
  useEffect(() => {
    let dragging = false;
    let lastX = 0;
    let accum = 0;
    let rafId: number | null = null;
    const SENSITIVITY = 0.5; // degrees per pixel
    const FLUSH_MS = 16;     // ~60fps batching
    let lastFlush = 0;

    const flush = (now: number) => {
      rafId = null;
      if (Math.abs(accum) < 0.05) return;
      if (now - lastFlush < FLUSH_MS) {
        rafId = requestAnimationFrame(flush);
        return;
      }
      Nui.post('nex_appearance_rotate_ped_delta', { delta: accum });
      accum = 0;
      lastFlush = now;
    };

    const onDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement | null;
      if (target && target.closest('[data-ui-panel]')) return;
      dragging = true;
      lastX = e.clientX;
      accum = 0;
      document.body.style.cursor = 'grabbing';
    };
    const onMove = (e: MouseEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      // Drag right -> rotate ped counter-clockwise (positive heading)
      accum += dx * SENSITIVITY;
      if (rafId == null) rafId = requestAnimationFrame(flush);
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      document.body.style.cursor = '';
      if (rafId != null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (Math.abs(accum) >= 0.05) {
        Nui.post('nex_appearance_rotate_ped_delta', { delta: accum });
        accum = 0;
      }
    };

    document.addEventListener('mousedown', onDown);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      if (rafId != null) cancelAnimationFrame(rafId);
      document.body.style.cursor = '';
    };
  }, []);

  useEffect(() => {
    if(!locales) {
      Nui.post('nex_appearance_get_locales').then(result => setLocales(result));
    }

    Nui.onEvent('nex_appearance_display', (data : any) => {
      if (data?.accent) setAccent(data.accent);
      setDisplay({ appearance: true, asynchronous: data.asynchronous });
    });

    Nui.onEvent('nex_appearance_hide', () => {
      setDisplay({ appearance: false, asynchronous: false });
      setCamera(CAMERA_INITIAL_STATE);
      setRotate(ROTATE_INITIAL_STATE);
      setExiting(false);
    });
  }, []);

  const fetchData = useCallback(async () => {
    const result = await Nui.post('nex_appearance_get_data');
    if (!result) return;
    setConfig(result.config);
    setStoredData(result.appearanceData);
    setData(result.appearanceData);
  }, []);

  const fetchSettings = useCallback(async () => {
    if (appearanceSettings === undefined || appearanceSettings === SETTINGS_INITIAL_STATE) {
      const result = await Nui.post('nex_appearance_get_settings');
      if (result) setAppearanceSettings(result.appearanceSettings);
    }
  }, []);

  useEffect(() => {
    if (display.appearance) {
      setMinLoaderElapsed(false);
      const t = setTimeout(() => setMinLoaderElapsed(true), 2000);
      (async () => {
        await fetchSettings();
        await fetchData();
      })();
      return () => clearTimeout(t);
    }
  }, [display.appearance]);

  return (
    <>
      {loaderTransition.map(
        ({ item, key, props: style }) =>
          item && (
            <animated.div key={key} style={style}>
              <Loader />
            </animated.div>
          ),
      )}
      {vignetteTransition.map(
        ({ item, key, props: style }) =>
          item && (
            <animated.div key={key} style={style}>
              <Vignette />
            </animated.div>
          ),
      )}
      {leftPanelTransition.map(
        ({ item, key, props: style }) =>
          item && dataReady && (() => {
            const tabs: { id: TabId; label: string; icon: JSX.Element; visible: boolean }[] = [
              { id: 'character',   label: 'Identity',    icon: <Icon icon={userRound} width={22} height={22} />,        visible: !!config.ped },
              { id: 'face',        label: 'Heritage',    icon: <Icon icon={smile} width={22} height={22} />,            visible: !!(isPedFreemodeModel && config.headBlend) },
              { id: 'features',    label: 'Sculpt',      icon: <Icon icon={slidersHorizontal} width={22} height={22} />, visible: !!(isPedFreemodeModel && config.faceFeatures) },
              { id: 'skin',        label: 'Complexion',  icon: <Icon icon={dna} width={22} height={22} />,              visible: !!(isPedFreemodeModel && config.headOverlays) },
              { id: 'hair',        label: 'Hair',        icon: <Icon icon={scissors} width={22} height={22} />,         visible: !!config.headOverlays },
              { id: 'makeup',      label: 'Glow Up',     icon: <Icon icon={palette} width={22} height={22} />,          visible: !!(isPedFreemodeModel && config.headOverlays) },
              { id: 'tattoos',     label: 'Ink',         icon: <Icon icon={paintbrush} width={22} height={22} />,       visible: !!(isPedFreemodeModel && config.tattoos) },
              { id: 'clothing',    label: 'Wardrobe',    icon: <Icon icon={shirtIcon} width={22} height={22} />,        visible: !!config.components },
              { id: 'accessories', label: 'Props',       icon: <Icon icon={gem} width={22} height={22} />,              visible: !!(config.props || config.components) },
            ];
            const visibleTabs = tabs.filter(t => t.visible);
            const currentTab: TabId =
              visibleTabs.some(t => t.id === activeTab) ? activeTab : (visibleTabs[0]?.id ?? 'character');

            return (
              <animated.div
                key={key}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  zIndex: 5,
                  ...style,
                }}
              >
                <Wrapper>
                  <PanelGroup>
                    <LeftColumn>
                      <HeaderCard>
                        <PanelHeaderIcon>
                          <Icon icon={userPen} width={26} height={26} />
                        </PanelHeaderIcon>
                        <PanelHeaderText>
                          <PanelHeaderTitle>Character Studio</PanelHeaderTitle>
                          <PanelHeaderSubtitle>Build the look you'll roll out in.</PanelHeaderSubtitle>
                        </PanelHeaderText>
                      </HeaderCard>
                      <OuterFrame>
                        <Container>
                          <PanelBody>
                        {currentTab === 'character' && config.ped && (
                          <Ped
                            settings={appearanceSettings.ped}
                            storedData={storedData.model}
                            data={data.model}
                            handleModelChange={handleModelChange}
                          />
                        )}
                        {currentTab === 'face' && isPedFreemodeModel && config.headBlend && (
                          <HeadBlend
                            settings={appearanceSettings.headBlend}
                            storedData={storedData.headBlend}
                            data={data.headBlend}
                            handleHeadBlendChange={handleHeadBlendChange}
                          />
                        )}
                        {currentTab === 'features' && isPedFreemodeModel && config.faceFeatures && (
                          <FaceFeatures
                            settings={appearanceSettings.faceFeatures}
                            storedData={storedData.faceFeatures}
                            data={data.faceFeatures}
                            handleFaceFeatureChange={handleFaceFeatureChange}
                          />
                        )}
                        {(currentTab === 'hair' || currentTab === 'skin' || currentTab === 'makeup') && config.headOverlays && (
                          <HeadOverlays
                            category={currentTab}
                            settings={{
                              hair: appearanceSettings.hair,
                              headOverlays: appearanceSettings.headOverlays,
                              eyeColor: appearanceSettings.eyeColor,
                              fade: appearanceSettings.tattoos.items['ZONE_HAIR']
                            }}
                            storedData={{
                              hair: storedData.hair,
                              headOverlays: storedData.headOverlays,
                              eyeColor: storedData.eyeColor,
                              fade: storedData.tattoos?.ZONE_HAIR?.length > 0 ? storedData.tattoos.ZONE_HAIR[0] : null
                            }}
                            data={{
                              hair: data.hair,
                              headOverlays: data.headOverlays,
                              eyeColor: data.eyeColor,
                              fade: data.tattoos?.ZONE_HAIR?.length > 0 ? data.tattoos.ZONE_HAIR[0] : null
                            }}
                            isPedFreemodeModel={isPedFreemodeModel}
                            handleHairChange={handleHairChange}
                            handleHeadOverlayChange={handleHeadOverlayChange}
                            handleEyeColorChange={handleEyeColorChange}
                            handleChangeFade={handleChangeFade}
                            automaticFade={config.automaticFade}
                          />
                        )}
                        {currentTab === 'clothing' && config.components && (
                          <Components
                            mode="clothing"
                            settings={appearanceSettings.components}
                            data={data.components}
                            storedData={storedData.components}
                            handleComponentDrawableChange={handleComponentDrawableChange}
                            handleComponentTextureChange={handleComponentTextureChange}
                            componentConfig={config.componentConfig}
                            hasTracker={config.hasTracker}
                            isPedFreemodeModel={isPedFreemodeModel}
                          />
                        )}
                        {currentTab === 'accessories' && (
                          <>
                            {config.components && (
                              <Components
                                mode="accessories"
                                settings={appearanceSettings.components}
                                data={data.components}
                                storedData={storedData.components}
                                handleComponentDrawableChange={handleComponentDrawableChange}
                                handleComponentTextureChange={handleComponentTextureChange}
                                componentConfig={config.componentConfig}
                                hasTracker={config.hasTracker}
                                isPedFreemodeModel={isPedFreemodeModel}
                              />
                            )}
                            {config.props && (
                              <Props
                                settings={appearanceSettings.props}
                                data={data.props}
                                storedData={storedData.props}
                                handlePropDrawableChange={handlePropDrawableChange}
                                handlePropTextureChange={handlePropTextureChange}
                                propConfig={config.propConfig}
                              />
                            )}
                          </>
                        )}
                        {currentTab === 'tattoos' && isPedFreemodeModel && config.tattoos && (
                          <Tattoos
                            settings={filterTattoos(appearanceSettings.tattoos)}
                            data={data.tattoos}
                            storedData={storedData.tattoos}
                            handleApplyTattoo={handleApplyTattoo}
                            handlePreviewTattoo={handlePreviewTattoo}
                            handleDeleteTattoo={handleDeleteTattoo}
                            handleClearTattoos={handleClearTattoos}
                          />
                        )}
                          </PanelBody>
                        </Container>
                      </OuterFrame>
                      <PanelFooter>
                        {config.enableExit && (
                          <Button variant="secondary" onClick={handleExit}>Discard</Button>
                        )}
                        <Button variant="save" onClick={handleSave}>Save Changes</Button>
                      </PanelFooter>
                    </LeftColumn>
                    <TabRail>
                      {visibleTabs.map(t => (
                        <TabButton
                          key={t.id}
                          active={t.id === currentTab}
                          onClick={() => setActiveTab(t.id)}
                          type="button"
                        >
                          {t.icon}
                          <TabLabel>{t.label}</TabLabel>
                        </TabButton>
                      ))}
                    </TabRail>
                  </PanelGroup>
                </Wrapper>
              </animated.div>
            );
          })(),
      )}
      <Options
        visible={showMainUi}
        camera={camera}
        rotate={rotate}
        clothes={clothes}
        handleSetClothes={handleSetClothes}
        handleSetCamera={handleSetCamera}
        handleTurnAround={handleTurnAround}
        handleRotateLeft={handleRotateLeft}
        handleRotateRight={handleRotateRight}
        handleSave={handleSave}
        handleExit={handleExit}
        enableExit={config?.enableExit ?? false}
      />
      {launcherTransition.map(
        ({ item, key, props: style }) =>
          item && !config?.disableDataPanel && (
            <animated.div
              key={key}
              style={{
                position: 'fixed',
                bottom: 0,
                left: '50%',
                zIndex: 6,
                ...style,
              }}
            >
              <LauncherDock>
                <ImportExportLauncher
                  type="button"
                  onClick={() => setImportExportOpen(true)}
                  aria-label="Open character snapshots panel"
                >
                  <Icon icon={save} width={18} height={18} />
                </ImportExportLauncher>
              </LauncherDock>
            </animated.div>
          ),
      )}
      {importExportBackdropTransition.map(
        ({ item, key, props: style }) =>
          item && (
            <animated.div
              key={key}
              data-ui-panel="true"
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 20,
                background: 'rgba(0, 0, 0, 0.78)',
                pointerEvents: importExportOpen ? 'auto' : 'none',
                ...style,
              }}
              onMouseDown={() => setImportExportOpen(false)}
            />
          ),
      )}
      {importExportTransition.map(
        ({ item, key, props: style }) =>
          item && data && (
            <animated.div
              key={key}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 21,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
                pointerEvents: 'none',
                ...style,
              }}
            >
              <div
                style={{
                  pointerEvents: importExportOpen ? 'auto' : 'none',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ImportExport
                  open
                  data={data}
                  onClose={() => setImportExportOpen(false)}
                  onImport={handleImportData}
                />
              </div>
            </animated.div>
          ),
      )}
    </>
  );
};

export default Appearance;
