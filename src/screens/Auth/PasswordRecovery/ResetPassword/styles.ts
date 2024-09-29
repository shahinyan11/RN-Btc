import { scaledSize } from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    paddingTop: scaledSize(65),
  },
  passwordContainerStyle: {
    marginTop: scaledSize(32),
    marginBottom: scaledSize(16),
  },
  passwordRepeatContainerStyle: {
    marginTop: scaledSize(16),
    marginBottom: scaledSize(32),
  },
  descriptionStyle: {
    marginTop: 8,
  },
  passwordRulesStyle: {
    lineHeight: 25,
  },
});

export default styles;
