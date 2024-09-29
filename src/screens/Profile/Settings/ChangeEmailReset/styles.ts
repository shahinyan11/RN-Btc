import {h3} from '@constants/styles';
import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  hintStyle: {
    marginVertical: scaledSize(24),
  },
  btnContainerStyle: {
    marginBottom: scaledSize(32),
  },
  linkContainerStyle: {
    alignSelf: 'center',
  },
  codeContainerStyle: {
    marginBottom: scaledSize(32),
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
