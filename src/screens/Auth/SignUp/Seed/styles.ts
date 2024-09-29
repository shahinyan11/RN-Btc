import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    marginTop: scaledSize(24),
  },
  subtitleStyle: {
    marginTop: 8,
  },

  wordsContainerStyle: {
    marginVertical: scaledSize(32),
    flex: 1,
  },
  checkBoxContainerStyle: {
    marginVertical: scaledSize(27),
  },
  linkContainerStyle: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default styles;
