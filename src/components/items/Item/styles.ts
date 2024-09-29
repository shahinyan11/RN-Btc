import EStyleSheet, {ViewStyle} from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils';

export default EStyleSheet.create({
  iconContainerStyle: {
    width: scaledSize(48),
    height: scaledSize(48),
    borderRadius: scaledSize(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaledSize(28),
  },
  centerContainerStyle: {
    flex: 5,
    marginHorizontal: scaledSize(12),
  },
  leftContainerStyle: {},

  statusIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});
