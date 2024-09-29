import {h3} from '@constants/styles';
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

  passwordRules: {
    lineHeight: 25,
  },
  subtitleStyle: {
    marginVertical: 8,
  },
  phoneContainerStyle: {
    marginVertical: scaledSize(24),
  },
  codeContainerStyle: {
    marginBottom: scaledSize(32),
    marginTop: scaledSize(40),
  },
  codeInputContainerStyle: {
    width: scaledSize(50),
  },
  codeItemContainerStyle: {
    backgroundColor: '$mediumGreen',
    width: scaledSize(56),
    height: scaledSize(48),
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeItemStyle: {
    ...h3,
    textAlign: 'center',
    color: 'white',
  },
  codeItemContainerStyleFocused: {
    borderWidth: 1,
    borderColor: '$lightGreen',
  },
});

export default styles;
