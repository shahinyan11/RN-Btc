import { scaledSize } from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  safeContainerStyle: {
    paddingTop: scaledSize(24),
  },
  hintStyle: {
    marginVertical: scaledSize(24),
  },
  passwordHintStyle: {
    marginVertical: scaledSize(16),
    color: 'white',
    fontSize: scaledSize(13),
    lineHeight: 25,
  },
});

export default styles;
