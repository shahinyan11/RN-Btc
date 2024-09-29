import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  titleContainerStyle: {
    flex: 1,
    marginHorizontal: 16,
  },
  itemMenuContainerStyle: {
    justifyContent: 'space-between',
    height: scaledSize(65),
    paddingHorizontal: scaledSize(16),
    marginVertical: scaledSize(6),
    borderRadius: 8,
    backgroundColor: '$mediumGreen',
  },
  gradientContainer: {padding: 1, borderRadius: 50},
  iconContainer: {backgroundColor: '$mediumGreen', borderRadius: 50},
  subtitleStyle: {
    marginTop: 5,
  },
  counterContainerStyle: {
    position: 'absolute',
    bottom: -3,
    right: -3,
  },
});

export default styles;
