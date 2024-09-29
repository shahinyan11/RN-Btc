import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    padding: scaledSize(24),
    justifyContent: 'center',
  },
  iconContainerStyle: {
    alignSelf: 'center',
  },
  titleStyle: {
    marginVertical: scaledSize(24),
    textAlign: 'center',
  },
  linkTextStyle: {
    alignSelf: 'center',
    marginBottom: 24,
  },
});

export default styles;
