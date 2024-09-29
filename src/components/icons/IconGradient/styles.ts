import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    width: scaledSize(160),
    height: scaledSize(160),
    borderRadius: scaledSize(80),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
