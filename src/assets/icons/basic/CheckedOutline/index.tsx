import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CheckedOutline = ({size, ...props}: any) => (
  <Svg
    width={size || 180}
    height={size || 180}
    viewBox="0 0 180 180"
    fill="none"
    {...props}>
    <Path
      d="M131.75 65.15L103.28 96.9489C91.999 109.55 86.3583 115.85 78.9375 115.85C71.5167 115.85 65.876 109.55 54.5945 96.9488L47.25 88.7455M174 90.5C174 137.168 136.168 175 89.5 175C42.8319 175 5 137.168 5 90.5C5 43.8319 42.8319 6 89.5 6C136.168 6 174 43.8319 174 90.5Z"
      stroke="white"
      strokeWidth="8"
      strokeLinecap="round"
    />
  </Svg>
);

export default CheckedOutline;
