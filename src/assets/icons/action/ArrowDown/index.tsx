import React from 'react';
import Svg, {Path} from 'react-native-svg';

const ArrowDown = ({size, color}: any) => {
  return (
    <Svg width={size || 18} height={size || 18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M9.24995 13C9.44177 13 9.63377 12.9267 9.7802 12.7803L17.2802 5.2803C17.5733 4.98723 17.5733 4.51267 17.2802 4.2198C16.9871 3.92692 16.5126 3.92673 16.2197 4.2198L9.24995 11.1895L2.2802 4.2198C1.98714 3.92673 1.51258 3.92673 1.2197 4.2198C0.926826 4.51286 0.92664 4.98742 1.2197 5.2803L8.7197 12.7803C8.86614 12.9267 9.05814 13 9.24995 13Z"
        fill={color || 'white'}
      />
    </Svg>
  );
};

export default ArrowDown;
