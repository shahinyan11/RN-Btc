import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  titleStyle: {
    lineHeight: 40,
  },
  subtitleStyle: {
    color: '$goldText',
    lineHeight: 24,
  },
  inputContainerStyle: {
    marginVertical: scaledSize(32),
  },
  sfContainerStyle: {
    paddingTop: scaledSize(65),
  },
});

export default styles;
