import React from 'react';
import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const Error = ({size, ...props}: any) => (
  <Svg
    width={size || 28}
    height={size || 28}
    viewBox="0 0 28 28"
    fill="none"
    {...props}>
    <G clipPath="url(#clip0_1178_378)">
      <Path
        d="M15.3 19.2C15.3 19.918 14.7179 20.5 14 20.5C13.282 20.5 12.7 19.918 12.7 19.2C12.7 18.4821 13.282 17.9 14 17.9C14.7179 17.9 15.3 18.4821 15.3 19.2Z"
        fill="#EF444A"
      />
      <Path
        d="M14 7.5V15.3M27 14C27 21.1797 21.1797 27 14 27C6.8203 27 1 21.1797 1 14C1 6.8203 6.8203 1 14 1C21.1797 1 27 6.8203 27 14Z"
        stroke="#EF444A"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_1178_378">
        <Rect width="28" height="28" fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Error;
