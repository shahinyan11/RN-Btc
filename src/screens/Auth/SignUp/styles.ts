import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    paddingTop: scaledSize(65),
  },
  linkTextStyle: {
    fontWeight: '700',
  },
  rulesStyles: {
    marginLeft: 10,
    flex: 1,
  },
  rulesContainerStyle: {
    justifyContent: 'flex-start',
  },
  fieldsContainerStyle: {
    marginVertical: scaledSize(32),
  },
  buttonContainerStyle: {
    marginTop: scaledSize(32),
  },
  passwordRules: {
    lineHeight: 25,
  },
});

export default styles;
