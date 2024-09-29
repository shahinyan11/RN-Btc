import EStyleSheet from 'react-native-extended-stylesheet';

import { regular } from './modes';

export const initThemes = () => EStyleSheet.build(regular);

export const setTheme = (themeName: string) => {
  switch (themeName) {
    default:
      return regular;
  }
};
