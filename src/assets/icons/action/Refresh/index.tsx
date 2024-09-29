import React from 'react';
import Svg, {Path} from 'react-native-svg';

const Refresh = ({size, color}: any) => {
  return (
    <Svg width={size || 20} height={size || 20} viewBox="0 0 20 20" fill="none">
      <Path
        d="M1.75 10.4286C1.75 10.0144 1.41421 9.67857 1 9.67857C0.585786 9.67857 0.25 10.0144 0.25 10.4286H1.75ZM4.59912 3.57143L5.03556 4.18137V4.18137L4.59912 3.57143ZM2.8 5.28488L3.33537 5.81013L3.36374 5.78121L3.38883 5.7494L2.8 5.28488ZM2.88642 1.00351C2.88836 0.589304 2.55415 0.251949 2.13994 0.250008C1.72573 0.248068 1.38837 0.582278 1.38643 0.996487L2.88642 1.00351ZM2.12845 2.70204L1.37846 2.69853V2.69853L2.12845 2.70204ZM5.44045 5.85633L5.44364 6.60632H5.44364L5.44045 5.85633ZM7.23078 6.59872C7.64499 6.59696 7.97935 6.25975 7.97759 5.84554C7.97583 5.43133 7.63862 5.09698 7.22441 5.09874L7.23078 6.59872ZM2.49615 5.20229L1.91409 5.67526L1.91409 5.67527L2.49615 5.20229ZM2.81519 5.50614L2.37021 6.10987L2.37021 6.10988L2.81519 5.50614ZM0.25 10.4286C0.25 15.6107 4.65013 19.75 10 19.75V18.25C5.40875 18.25 1.75 14.7142 1.75 10.4286H0.25ZM10 19.75C15.3499 19.75 19.75 15.6107 19.75 10.4286H18.25C18.25 14.7142 14.5913 18.25 10 18.25V19.75ZM19.75 10.4286C19.75 5.24643 15.3499 1.10714 10 1.10714V2.60714C14.5913 2.60714 18.25 6.14298 18.25 10.4286H19.75ZM10 1.10714C7.81454 1.10714 5.79232 1.79542 4.16269 2.96149L5.03556 4.18137C6.4146 3.1946 8.13249 2.60714 10 2.60714V1.10714ZM4.16269 2.96149C3.42493 3.48939 2.76725 4.11547 2.21117 4.82036L3.38883 5.7494C3.8563 5.15683 4.41099 4.62827 5.03556 4.18137L4.16269 2.96149ZM1.38643 0.996487L1.37846 2.69853L2.87844 2.70555L2.88642 1.00351L1.38643 0.996487ZM5.44364 6.60632L7.23078 6.59872L7.22441 5.09874L5.43727 5.10633L5.44364 6.60632ZM1.37846 2.69853C1.37537 3.3587 1.37149 3.92034 1.42334 4.37252C1.47721 4.84235 1.59944 5.28806 1.91409 5.67526L3.07821 4.72931C3.01562 4.65229 2.95082 4.52654 2.91357 4.20164C2.87429 3.85909 2.87518 3.40273 2.87844 2.70555L1.37846 2.69853ZM5.43727 5.10633C4.70785 5.10943 4.22117 5.11047 3.85375 5.07225C3.49908 5.03537 3.35088 4.96926 3.26017 4.90241L2.37021 6.10988C2.76695 6.40229 3.21877 6.5143 3.69858 6.56421C4.16562 6.61278 4.74785 6.60928 5.44364 6.60632L5.43727 5.10633ZM1.91409 5.67527C1.99707 5.77739 2.08805 5.87263 2.18603 5.96023L3.18585 4.84204C3.14661 4.80695 3.11065 4.76923 3.0782 4.72931L1.91409 5.67527ZM2.18603 5.96023C2.24496 6.01293 2.30643 6.06286 2.37021 6.10987L3.26017 4.90241C3.23425 4.8833 3.20945 4.86315 3.18585 4.84204L2.18603 5.96023ZM2.26463 4.75963L2.15057 4.87589L3.2213 5.92638L3.33537 5.81013L2.26463 4.75963Z"
        fill={color || 'white'}
        fillOpacity="0.5"
      />
    </Svg>
  );
};

export default Refresh;
