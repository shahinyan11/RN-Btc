import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';
import fonts from '@constants/fonts';

const styles = EStyleSheet.create({
  inputContainer: {
    height: 58,
    borderWidth: 1,
    borderRadius: 8,
    marginVertical: 8,
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '$white1',
    paddingHorizontal: scaledSize(20),
    backgroundColor: '#25284B',
  },

  label: {
    fontFamily: fonts.InterRegular,
    fontSize: scaledSize(12),
    letterSpacing: -scaledSize(0.32),
    color: '$white5',
  },

  input: {
    flex: 1,
    color: '$white',
  },
});

export default styles;
