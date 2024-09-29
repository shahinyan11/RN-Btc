import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';
import fonts from '@constants/fonts';

const styles = EStyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '$white1',
    paddingHorizontal: scaledSize(20),
  },
  label: {
    fontFamily: fonts.InterRegular,
    fontSize: scaledSize(12),
    letterSpacing: -scaledSize(0.32),
    color: '$white5',
  },
  input: {
    fontFamily: fonts.InterRegular,
    fontSize: scaledSize(16),
    letterSpacing: -scaledSize(0.32),
    flex: 1,
    color: '$white5',
    height: 58, // this value set for KeyboardAvoidingView. It works with input height
  },
});

export default styles;
