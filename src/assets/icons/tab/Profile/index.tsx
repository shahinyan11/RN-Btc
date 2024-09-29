import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function Dashboard({size, color}: any) {
  return (
    <Svg width={size || 28} height={size || 28} viewBox="0 0 28 28" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 2.91666C11.0382 2.91666 8.6371 5.2162 8.6371 8.05283C8.6371 10.8895 11.0382 13.189 14 13.189C16.9619 13.189 19.3629 10.8895 19.3629 8.05283C19.3629 5.2162 16.9619 2.91666 14 2.91666ZM10.3306 8.05283C10.3306 6.11198 11.9735 4.53861 14 4.53861C16.0265 4.53861 17.6694 6.11198 17.6694 8.05283C17.6694 9.99369 16.0265 11.5671 14 11.5671C11.9735 11.5671 10.3306 9.99369 10.3306 8.05283Z"
        fill={color || 'white'}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.6129 14.811C7.65105 14.811 5.25 17.1105 5.25 19.9471C5.25 22.7838 7.65105 25.0833 10.6129 25.0833H17.3871C20.3489 25.0833 22.75 22.7838 22.75 19.9471C22.75 17.1105 20.3489 14.811 17.3871 14.811H10.6129ZM6.94355 19.9471C6.94355 18.0063 8.58637 16.4329 10.6129 16.4329H17.3871C19.4136 16.4329 21.0565 18.0063 21.0565 19.9471C21.0565 21.888 19.4136 23.4614 17.3871 23.4614H10.6129C8.58637 23.4614 6.94355 21.888 6.94355 19.9471Z"
        fill={color || 'white'}
      />
    </Svg>
  );
}
