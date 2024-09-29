import { scaledSize } from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  titleStyle: {
    textAlign: 'center',
  },
  actionButtonStyle: {
    marginHorizontal: scaledSize(16),
  },
  moreContainerStyle: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: scaledSize(32),
    height: scaledSize(32),
    borderRadius: scaledSize(3),
    backgroundColor: '$darkSecondary',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreBtnContainerStyle: {
    paddingVertical: 16,
    justifyContent: 'center',
  },
  modalWindowStyle: {
    backgroundColor: '$darkMain',
    minHeight: '80%',
  },
  modalMoreWindowStyle: {
    backgroundColor: '$darkMain',
  },
});

export default styles;
