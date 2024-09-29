import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils';
import fonts from '@constants/fonts';

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
  },

  title: {
    fontFamily: fonts.InterRegular,
    fontSize: scaledSize(24),
    marginBottom: 8,
    color: '$white',
    fontWeight: '600',
  },

  desc: {
    color: '$goldText',
    fontFamily: fonts.montRegular,
    fontSize: scaledSize(15),
    lineHeight: scaledSize(15) * 1.6,
  },

  text: {
    color: '$white',
    fontFamily: fonts.montRegular,
    fontSize: scaledSize(16),
    lineHeight: scaledSize(16) * 1.4,
    width: scaledSize(265),
    fontWeight: '600',
    textAlign: 'center',
  },

  accountDeleted: {
    color: '$white',
    marginBottom: 20,
  },

  inputContainer: {
    marginVertical: 32,
  },

  textArea: {
    alignItems: 'flex-start',
    height: scaledSize(217),
    paddingVertical: scaledSize(12),
    paddingHorizontal: scaledSize(16),
    marginBottom: scaledSize(162),
  },

  buttonContainer: {
    backgroundColor: '$lightBlue',
  },

  disabledButtonContainer: {
    backgroundColor: '$secondaryBlue',
  },
});

export default styles;
