import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  codeContainer: {
    marginVertical: 32,
  },
  descriptionStyle: {
    marginTop: 8,
  },
  sfContainerStyle: {
    paddingTop: scaledSize(65),
  },
});

export default styles;
