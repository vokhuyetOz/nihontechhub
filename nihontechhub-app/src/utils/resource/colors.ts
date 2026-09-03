import { ColorValue } from 'react-native';

const PLACEHOLDER_COLORS = [
  '#E0E0E0', // xám nhạt
  '#FCE4EC', // hồng nhạt
  '#FFF9C4', // vàng nhạt
  '#E3F2FD', // xanh dương nhạt
  '#E8F5E9', // xanh lá nhạt
  '#F3E5F5', // tím nhạt
  '#FFE0B2', // cam pastel
  '#D7CCC8', // nâu xám nhạt
  '#C8E6C9', // xanh lá pastel
  '#B3E5FC', // xanh biển nhạt
  '#FFECB3', // vàng kem
  '#F8BBD0', // hồng pastel
  '#D1C4E9', // tím lavender
  '#BBDEFB', // xanh sky
  '#DCEDC8', // xanh lá mạ
  '#FFCCBC', // hồng cam
];

export const randomPlaceholderColor = () => {
  return PLACEHOLDER_COLORS[
    Math.floor(Math.random() * PLACEHOLDER_COLORS.length)
  ];
};
const Colors = {
  light: {
    app: {
      Primary: 'hsl(221 83% 53%)', //Main
      Functional_Success: '#149E53',
      Functional_Warning: '#FFA02E',
      Functional_Error: '#D12030',
      Functional_Link: '#0040DD',
      Shape_Icon: '#B0B0B0',
      Shape_Border: '#D9D9D9',
      Shape_Divider: '#F1F1F1',
      Shape_Disable: '#C4C4C4',
      Shape_Base: '#fff',
      Text_Title: '#272727',
      Text_Primary: '#262626',
      Text_Secondary: '#595959',
      Text_Disable: '#A3A3A3',
      Text_HighLight: '#007AFF',
      Text_Base: '#fff',
      Background_Success: '#E5F6E6',
      Background_Error: '#FEEBEF',
      Background_Warning: '#FFF8E1',
      Background_Link: '#E9ECFF',
      Background_Disable: '#E4E4E4',
      Background_Blue: '#B4CBFC',
      Background_Overlay: 'rgba(95,95,95, 0.3)',
      Background_Base: '#fff',
      Background_Base_Alpha: 'rgba(255, 255, 255, 0.3)',
    },
    button: {
      primary: 'hsl(221 83% 53%)',
      sub_primary: '#ffffff',
      google: '#fff',
    },
    bottomBar: { primary: '#0040DD', sub_primary: '#ffffff' },
    input: {
      textColor: '#262626',
      default: '#595959',
      success: '#149E53',
      error: '#D12030',
      disabled: '#E4E4E4',
      placeholder: '#595959',
    },
    progressStep: { active: '#149E53', inactive: '#A8A8A8' },
    radio: { primary: '#149E53', background: '#fff', inactive: '#D9D9D9' },
  },
  dark: {
    app: {
      Primary: '#409CFF', //Main
      Functional_Success: '#30DB5B',
      Functional_Warning: '#FFB340',
      Functional_Error: '#F0362C',
      Functional_Link: '#409CFF',
      Shape_Icon: '#FAFAFA',
      Shape_Border: '#565656',
      Shape_Divider: '#595959',
      Shape_Disable: '#626262',
      Shape_Base: '#262626',
      Text_Title: '#FFFFFF',
      Text_Primary: '#FAFAFA',
      Text_Secondary: '#F5F5F5',
      Text_Disable: '#747474',
      Text_HighLight: '#007AFF',
      Text_Base: '#f5f5f5',
      Background_Success: '#E5F6E6',
      Background_Error: '#FEEBEF',
      Background_Warning: '#FFF8E1',
      Background_Link: '#E9ECFF',
      Background_Disable: '#383838',
      Background_Blue: '#B4CBFC',
      Background_Overlay: 'rgba(0, 0, 0, 0.3)',
      Background_Base: '#181818',
      Background_Base_Alpha: 'rgba(24, 24, 24, 0.5)',
    },
    button: { primary: '#F85767', sub_primary: '#ffffff', google: '#131314' },
    bottomBar: { primary: '#F85767', sub_primary: '#ffffff' },
    input: {
      border_default: '#F5F5F5',
      border_success: '#595959',
      border_error: '#F0362C',
      textColor: '#FAFAFA',
      bgDisabled: '#383838',
      placeholder: '#19D047',
    },
    progressStep: { active: '#30DB5B', inactive: '#A8A8A8' },
    radio: { primary: '#149E53', background: '#fff', inactive: '#D9D9D9' },
  },
};

export type TElement = keyof typeof Colors.light;

export type TColor = {
  [key in TElement]: {
    [key2 in keyof (typeof Colors.light)[key]]: ColorValue;
  };
};

export { Colors };
