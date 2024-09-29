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
});

export default styles;
