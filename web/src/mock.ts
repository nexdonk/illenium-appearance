interface Mocks {
  [key: string]: any;
}

export const mocks: Mocks = {
  nex_get_theme_configuration: async () => ({
    currentTheme: 'modern-minimal',
    themes: [{
      id: 'modern-minimal',
      borderRadius: '4px',
      fontColor: '255, 255, 255',
      fontColorHover: '255, 255, 255',
      fontColorSelected: '0, 0, 0',
      fontFamily: 'Inter',
      primaryBackground: '0, 0, 0',
      primaryBackgroundSelected: '255, 255, 255',
      secondaryBackground: '0, 0, 0',
      scaleOnHover: false,
      sectionFontWeight: 'normal',
      smoothBackgroundTransition: false,
    }]
  }),
  nex_appearance_get_locales: async () => ({
    modal: {
      save: {
        title: 'Save customization',
        description: 'You will remain ugly'
      },
      exit: {
        title: 'Exit customization',
        description: 'No changes will be saved'
      },
      accept: 'Yes',
      decline: 'No'
    },
    ped: {
      title: 'Ped',
      model: 'Model'
    },
    headBlend: {
      title: 'Inheritance',
      shape: {
        title: 'Face',
        firstOption: 'Father',
        secondOption: 'Mother',
        mix: 'Mix'
      },
      skin: {
        title: 'Skin',
        firstOption: 'Father',
        secondOption: 'Mother',
        mix: 'Mix'
      },
      race: {
        title: 'Race',
        shape: 'Shape',
        skin: 'Skin',
        mix: 'Mix'
      }
    },
    faceFeatures: {
      title: 'Face Features',
      nose: {
        title: 'Nose',
        width: 'Width',
        height: 'Height',
        size: 'Size',
        boneHeight: 'Bone height',
        boneTwist: 'Bone twist',
        peakHeight: 'Peak height'
      },
      eyebrows: {
        title: 'Eyebrows',
        height: 'Height',
        depth: 'Depth'
      },
      cheeks: {
        title: 'Cheeks',
        boneHeight: 'Bone height',
        boneWidth: 'Bone width',
        width: 'Width'
      },
      eyesAndMouth: {
        title: 'Eyes and Mouth',
        eyesOpening: 'Eyes opening',
        lipsThickness: 'Lip thickness'
      },
      jaw: {
        title: 'Jaw',
        width: 'Width',
        size: 'Size'
      },
      chin: {
        title: 'Chin',
        lowering: 'Lowering',
        length: 'Length',
        size: 'Size',
        hole: 'Hole size'
      },
      neck: {
        title: 'Neck',
        thickness: 'Thickness'
      }
    },
    headOverlays: {
      title: 'Appearance',
      hair: {
        title: 'Hair',
        style: 'Style',
        color: 'Color',
        highlight: 'Highlight',
        texture: 'Texture',
        fade: 'Fade'
      },
      opacity: 'Opacity',
      style: 'Style',
      color: 'Color',
      secondColor: 'Secondary Color',
      blemishes: 'Blemishes',
      beard: 'Beard',
      eyebrows: 'Eyebrows',
      ageing: 'Ageing',
      makeUp: 'Make up',
      blush: 'Blush',
      complexion: 'Complexion',
      sunDamage: 'Sun damage',
      lipstick: 'Lipstick',
      moleAndFreckles: 'Mole and Freckles',
      chestHair: 'Chest hair',
      bodyBlemishes: 'Body blemishes',
      eyeColor: 'Eye color'
    },
    components: {
      title: 'Clothes',
      drawable: 'Drawable',
      texture: 'Texture',
      mask: 'Mask',
      upperBody: 'Hands',
      lowerBody: 'Legs',
      bags: 'Bags and parachute',
      shoes: 'Shoes',
      scarfAndChains: 'Scarf and chains',
      shirt: 'Shirt',
      bodyArmor: 'Body armor',
      decals: 'Decals',
      jackets: 'Jackets',
      head: 'Head'
    },
    props: {
      title: 'Props',
      drawable: 'Drawable',
      texture: 'Texture',
      hats: 'Hats and helmets',
      glasses: 'Glasses',
      ear: 'Ear',
      watches: 'Watches',
      bracelets: 'Bracelets'
    },
    tattoos: {
      title: 'Tattoos',
      items: {
        ZONE_TORSO: 'Torso',
        ZONE_HEAD: 'Head',
        ZONE_LEFT_ARM: 'Left arm',
        ZONE_RIGHT_ARM: 'Right arm',
        ZONE_LEFT_LEG: 'Left leg',
        ZONE_RIGHT_LEG: 'Right leg'
      },
      apply: 'Apply',
      delete: 'Remove',
      deleteAll: 'Remove all Tattoos',
      opacity: 'Opacity'
    },
    accept: 'Yes',
    decline: 'No'
  }),
  nex_appearance_get_data: async () => ({
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
    appearanceData: {
      model: 'mp_m_freemode_01',
      components: [
        { component_id: 0, drawable: 15, texture: 0 },
        { component_id: 1, drawable: 15, texture: 0 },
        { component_id: 2, drawable: 15, texture: 0 },
        { component_id: 3, drawable: 15, texture: 0 },
        { component_id: 4, drawable: 15, texture: 0 },
        { component_id: 5, drawable: 15, texture: 0 },
        { component_id: 6, drawable: 15, texture: 0 },
        { component_id: 7, drawable: 15, texture: 0 },
        { component_id: 8, drawable: 15, texture: 0 },
        { component_id: 9, drawable: 15, texture: 0 },
        { component_id: 10, drawable: 15, texture: 0 },
        { component_id: 11, drawable: 15, texture: 0 },
      ],
      props: [
        { prop_id: 0, drawable: -1, texture: 0 },
        { prop_id: 1, drawable: -1, texture: 0 },
        { prop_id: 2, drawable: -1, texture: 0 },
        { prop_id: 6, drawable: -1, texture: 0 },
        { prop_id: 7, drawable: -1, texture: 0 },
      ],
      headBlend: {
        shapeFirst: 0,
        shapeSecond: 0,
        shapeThird: 0,
        shapeMix: 0.5,
        skinFirst: 0,
        skinSecond: 0,
        skinThird: 0,
        skinMix: 0.5,
        thirdMix: 0,
      },
      faceFeatures: {
        noseWidth: 0,
        nosePeakHigh: 0,
        nosePeakSize: 0,
        noseBoneHigh: 0,
        nosePeakLowering: 0,
        noseBoneTwist: 0,
        eyeBrownHigh: 0,
        eyeBrownForward: 0,
        cheeksBoneHigh: 0,
        cheeksBoneWidth: 0,
        cheeksWidth: 0,
        eyesOpening: 0,
        lipsThickness: 0,
        jawBoneWidth: 0,
        jawBoneBackSize: 0,
        chinBoneLowering: 0,
        chinBoneLenght: 0,
        chinBoneSize: 0,
        chinHole: 0,
        neckThickness: 0,
      },
      headOverlays: {
        blemishes: { style: 0, opacity: 0 },
        beard: { style: 0, opacity: 0, color: 0 },
        eyebrows: { style: 0, opacity: 0, color: 0 },
        ageing: { style: 0, opacity: 0 },
        makeUp: { style: 0, opacity: 0, color: 0, secondColor: 0 },
        blush: { style: 0, opacity: 0, color: 0 },
        complexion: { style: 0, opacity: 0 },
        sunDamage: { style: 0, opacity: 0 },
        lipstick: { style: 0, opacity: 0, color: 0 },
        moleAndFreckles: { style: 0, opacity: 0 },
        chestHair: { style: 0, opacity: 0, color: 0 },
        bodyBlemishes: { style: 0, opacity: 0 },
      },
      hair: { style: 0, color: 0, highlight: 0, texture: 0 },
      eyeColor: 0,
      tattoos: {},
    }
  }),
  nex_appearance_get_settings: async () => ({
    appearanceSettings: {
      ped: { model: { items: ['mp_m_freemode_01', 'mp_f_freemode_01'] } },
      components: [
        { component_id: 0, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { component_id: 1, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { component_id: 2, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { component_id: 3, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { component_id: 4, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { component_id: 5, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { component_id: 6, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { component_id: 7, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { component_id: 8, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { component_id: 9, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { component_id: 10, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { component_id: 11, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
      ],
      props: [
        { prop_id: 0, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { prop_id: 1, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { prop_id: 2, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { prop_id: 6, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
        { prop_id: 7, drawable: { min: 0, max: 20 }, texture: { min: 0, max: 20 }, blacklist: { drawables: [], textures: [] } },
      ],
      headBlend: {
        shapeFirst: { min: 0, max: 20 },
        shapeSecond: { min: 0, max: 20 },
        shapeThird: { min: 0, max: 20 },
        skinFirst: { min: 0, max: 20 },
        skinSecond: { min: 0, max: 20 },
        skinThird: { min: 0, max: 20 },
        shapeMix: { min: 0, max: 100, factor: 0.01 },
        skinMix: { min: 0, max: 100, factor: 0.01 },
        thirdMix: { min: 0, max: 100, factor: 0.01 },
      },
      faceFeatures: {
        noseWidth: { min: -100, max: 100, factor: 0.01 },
        nosePeakHigh: { min: -100, max: 100, factor: 0.01 },
        nosePeakSize: { min: -100, max: 100, factor: 0.01 },
        noseBoneHigh: { min: -100, max: 100, factor: 0.01 },
        nosePeakLowering: { min: -100, max: 100, factor: 0.01 },
        noseBoneTwist: { min: -100, max: 100, factor: 0.01 },
        eyeBrownHigh: { min: -100, max: 100, factor: 0.01 },
        eyeBrownForward: { min: -100, max: 100, factor: 0.01 },
        cheeksBoneHigh: { min: -100, max: 100, factor: 0.01 },
        cheeksBoneWidth: { min: -100, max: 100, factor: 0.01 },
        cheeksWidth: { min: -100, max: 100, factor: 0.01 },
        eyesOpening: { min: -100, max: 100, factor: 0.01 },
        lipsThickness: { min: -100, max: 100, factor: 0.01 },
        jawBoneWidth: { min: -100, max: 100, factor: 0.01 },
        jawBoneBackSize: { min: -100, max: 100, factor: 0.01 },
        chinBoneLowering: { min: -100, max: 100, factor: 0.01 },
        chinBoneLenght: { min: -100, max: 100, factor: 0.01 },
        chinBoneSize: { min: -100, max: 100, factor: 0.01 },
        chinHole: { min: -100, max: 100, factor: 0.01 },
        neckThickness: { min: -100, max: 100, factor: 0.01 },
      },
      headOverlays: {
        blemishes: { style: { min: 0, max: 10 }, opacity: { min: 0, max: 100, factor: 0.01 } },
        beard: { style: { min: 0, max: 10 }, opacity: { min: 0, max: 100, factor: 0.01 }, color: { items: [[0, 0, 0]] } },
        eyebrows: { style: { min: 0, max: 10 }, opacity: { min: 0, max: 100, factor: 0.01 }, color: { items: [[0, 0, 0]] } },
        ageing: { style: { min: 0, max: 10 }, opacity: { min: 0, max: 100, factor: 0.01 } },
        makeUp: { style: { min: 0, max: 10 }, opacity: { min: 0, max: 100, factor: 0.01 }, color: { items: [[0, 0, 0]] }, secondColor: { items: [[0, 0, 0]] } },
        blush: { style: { min: 0, max: 10 }, opacity: { min: 0, max: 100, factor: 0.01 }, color: { items: [[0, 0, 0]] } },
        complexion: { style: { min: 0, max: 10 }, opacity: { min: 0, max: 100, factor: 0.01 } },
        sunDamage: { style: { min: 0, max: 10 }, opacity: { min: 0, max: 100, factor: 0.01 } },
        lipstick: { style: { min: 0, max: 10 }, opacity: { min: 0, max: 100, factor: 0.01 }, color: { items: [[0, 0, 0]] } },
        moleAndFreckles: { style: { min: 0, max: 10 }, opacity: { min: 0, max: 100, factor: 0.01 } },
        chestHair: { style: { min: 0, max: 10 }, opacity: { min: 0, max: 100, factor: 0.01 }, color: { items: [[0, 0, 0]] } },
        bodyBlemishes: { style: { min: 0, max: 10 }, opacity: { min: 0, max: 100, factor: 0.01 } },
      },
      hair: {
        style: { min: 0, max: 70 },
        color: { items: [[0, 0, 0]] },
        highlight: { items: [[0, 0, 0]] },
        texture: { min: 0, max: 10 },
        blacklist: { drawables: [], textures: [] },
      },
      eyeColor: { min: 0, max: 31 },
      tattoos: {
        items: {},
        opacity: { min: 0, max: 100, factor: 0.01 }
      }
    }
  }),
};

export default function mock(event: string, value: any): void {
  mocks[event] = value;
}
