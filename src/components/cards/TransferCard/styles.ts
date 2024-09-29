import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: '$mediumGreen',
    borderRadius: 12,
    minHeight: 100,
    padding: 16,
    marginVertical: 24,
  },
  iconWalletContainerStyle: {
    width: scaledSize(50),
    height: scaledSize(50),
    borderRadius: scaledSize(25),
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainerStyle: {
    alignItems: 'flex-start',
  },
  descriptionText: {
    fontSize: scaledSize(13),
    color: '$darkGray',
  },
  rightContainerStyle: {
    alignItems: 'flex-end',
  },
});

export default styles;
