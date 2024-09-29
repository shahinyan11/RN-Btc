import EStyleSheet from 'react-native-extended-stylesheet';
import DeviceInfo from 'react-native-device-info';
import { scaledSize } from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: '$darkMain',
    borderTopWidth: 1,
    borderColor: '$darkGray',
  },
  mainContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: scaledSize(50),
    marginBottom: DeviceInfo.hasNotch() ? 30 : 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterStyle: {},
  counterContainerStyle: {
    position: 'absolute',
    top: -4.5,
    right: -4.5,
  },
});

export default styles;
