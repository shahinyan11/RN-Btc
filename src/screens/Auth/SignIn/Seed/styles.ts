import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    marginTop: scaledSize(24),
  },
  subtitleStyle: {
    marginTop: 8,
  },
  rowContainerStyle: {
    marginVertical: 6,
  },
  leftItemContainerStyle: {
    marginRight: 5,
  },
  rightItemContainerStyle: {
    marginLeft: 5,
  },
  wordsContainerStyle: {
    marginVertical: scaledSize(32),
  },
});

export default styles;
