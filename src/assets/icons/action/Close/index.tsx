import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Close = ({size, color}: any) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17.59 5L12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41 17.59 5z"
        fill={color || 'white'}
      />
    </Svg>
  );
};

export default Close
