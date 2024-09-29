import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

// const DEF_HEIGHT = 896;
// const DEF_WIDTH = 414;

const DEF_HEIGHT = 812;
const DEF_WIDTH = 375;

const scaleWidth = width / DEF_WIDTH;
const scaleHeight = height / DEF_HEIGHT;
const scale = Math.min(scaleWidth, scaleHeight);

export const scaledSize = (size: number) => Math.ceil(size * scale);
