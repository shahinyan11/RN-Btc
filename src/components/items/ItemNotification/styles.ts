import { scaledSize } from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    marginHorizontal: scaledSize(24),
  },
  descriptionStyle: {
    marginTop: 4,
  },
  dateTextStyle: {
    color: '$goldLight',
    marginTop: 4,
  },
  rowContainerStyle: {
    marginTop: scaledSize(12),
  },
  btnContainerStyle: {
    height: scaledSize(40),
    minWidth: scaledSize(145),
  },
  iconContainerStyle: {
    width: scaledSize(48),
    height: scaledSize(48),
    borderRadius: scaledSize(24),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,209,109,0.1)',
    marginRight: 15,
  },
  activeDotStyle: {
    position: 'absolute',
    left: -10,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '$goldMain',
  },
  activeDotContainerStyle: {
    width: 6,
  },
});

export default styles;
