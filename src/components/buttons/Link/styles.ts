import {buttonTitle} from '@constants/styles';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleStyle: {
    ...buttonTitle,
    color: '$white',
    fontWeight: '700',
  },
  iconContainerStyle: {
    marginRight: 5,
  },
});

export default styles;
