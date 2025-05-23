import {scale} from '../utils/scaling';

export const Colors = {
  primary: '#F83758',
  secondary: '#FFC107',
  background: '#F5F5F5',
  gray: '#A8A8A9',
  white: '#FFFFFF',
  black: '#000000',
  red: '#FF0000',
  overlay: 'rgba(0,0,0,0.4)',
};

export const FontSizes = {
  xsmall: scale(10),
  small: scale(12),
  medium: scale(14),
  regular: scale(16),
  semiLarge: scale(18),
  large: scale(20),
  xlarge: scale(22),
  xxlarge: scale(24),
  huge: scale(26),
};

export const FontWeights = {
  thin: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
};

export const Spacing = {
  s2: 2,
  s4: 4,
  s6: 6,
  s8: 8,
  s10: 10,
  s15: 15,
  s16: 16,
  s20: 20,
  s24: 24,
  s25: 25,
  s30: 30,
  s35: 35,
  s40: 40,
};

export const BorderRadius = {
  r2: 2,
  r4: 4,
  r6: 6,
  r8: 8,
  r10: 10,
  r12: 12,
  r20: 20,
  rFull: 999,
};

export const Shadows = {
  light: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  heavy: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  extraHeavy: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
};

export const lightTheme = {
  mode: 'light',
  background: '#FFFFFF',
  text: '#000000',
  primary: '#FF6347',
  card: '#F3F3F3',
};

export const darkTheme = {
  mode: 'dark',
  background: '#000000',
  text: '#FFFFFF',
  primary: '#FF6347',
  card: '#1E1E1E',
};
