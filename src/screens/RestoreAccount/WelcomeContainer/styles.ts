import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils';
import fonts from '@constants/fonts';

const styles = EStyleSheet.create({
  containerStyle: {
    marginTop: scaledSize(40),
  },

  logo: {
    height: 180,
    resizeMode: 'stretch',
  },
  title: {
    fontFamily: fonts.montRegular,
    fontWeight: '600',
    color: '$white',
    fontSize: scaledSize(25),
    lineHeight: scaledSize(25) * 1.6,
    marginVertical: 9,
    textAlign: 'center',
  },

  subtitle: {
    color: '$goldText',
    textAlign: 'center',
    marginBottom: 92,
  },

  accountDeleted: {
    color: '$white',
    marginBottom: 20,
  },
});

export default styles;
