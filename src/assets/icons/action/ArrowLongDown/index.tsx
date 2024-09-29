import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowLongDown = ({size, color}: any) => (
  <Svg
    width={size || '24'}
    height={size || '24'}
    viewBox="0 0 24 24"
    fill="none">
    <Path
      d="M11 18.17L8.41 15.59L7 17L12 22L17 17L15.59 15.59L13 18.17L13 2L11 2L11 18.17Z"
      fill={color || 'white'}
    />
  </Svg>
);
export default ArrowLongDown;
