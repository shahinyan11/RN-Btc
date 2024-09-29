declare module 'react-native-extended-stylesheet' {
  import {
    ImageStyle as RNImageStyle,
    StyleSheet,
    TextStyle as RNTextStyle,
    ViewStyle as RNViewStyle,
  } from 'react-native';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  import NamedStyles = StyleSheet.NamedStyles;
  type ExtraStyles<T> = {
    '@media android'?: ExtendedStyle<T>;
    '@media ios'?: ExtendedStyle<T>;
  };

  type ElementStyle<T> = ExtendedStyle<T> & ExtraStyles<T>;

  export type ExtendedStyle<T> = {
    [Q in keyof T]: any;
  };

  export type ViewStyle = ExtendedStyle<RNViewStyle>;
  export type TextStyle = ExtendedStyle<RNTextStyle>;
  export type ImageStyle = ExtendedStyle<RNImageStyle>;
  export type CustomStyleValues = ITheme;

  function value(expr: ITheme, prop?: string): any;

  type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

  function create<T extends NamedStyles<T> | NamedStyles<any>>(
    styles: T | NamedStyles<T> | {[P in keyof T]: ElementStyle<T[P]>},
  ): {[P in keyof T]: RegisteredStyle<T[P]>};

  function build(rawGlobalVars: any): void;
}

type RegisteredStyle<T> = number & {__registeredStyleBrand: T};

/** Declare custom style values here */

type ITheme =
  | '$theme'
  | '$darkMain'
  | '$darkSecondary'
  | '$darkGray'
  | '$darkLight'
  | '$gray'
  | '$goldMain'
  | '$goldPressed'
  | '$goldDisabled'
  | '$goldText'
  | '$goldLight'
  | '$white'
  | '$white1'
  | '$white5'
  | '$darkPressed'
  | '$error'
  | '$errorBG'
  | '$success'
  | '$successBG'
  | '$alert'
  | '$alertBG'
  | '$goldGradientStart'
  | '$goldGradientEnd'
  | '$darkGradientStart'
  | '$darkGradientEnd'
  | '$lightGreen'
  | '$secondaryGreen'
  | '$mediumGreen'
  | '$blueGradientStart'
  | '$greenGradientEnd'
  | '$darkGrayText'
  | '$greenRegular'
  | '$grayRegular'
  | '$backDropColor'
  | '$blueText'
  | '$lightBlue'
  | '$secondaryBlue';
