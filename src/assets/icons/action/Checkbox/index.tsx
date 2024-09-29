import React from 'react';
import Svg, {Path, Rect} from 'react-native-svg';

const Checkbox = ({size, color, checked}: any) => (
  <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
    <Rect
      x="0.5"
      y="0.5"
      width="23"
      height="23"
      rx="1.5"
      stroke={color || 'white'}
    />
    <Path
      d="M7 11.9091L11 16L17 7"
      stroke={checked ? color || 'white' : 'none'}
      strokeWidth="2"
      strokeLinecap="round"
    />
  </Svg>
);

export default Checkbox;
