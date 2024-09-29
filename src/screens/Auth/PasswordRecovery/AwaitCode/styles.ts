import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  hintStyle: {
    textAlign: 'center',
    lineHeight: 20,
  },
  topContainer: {
    flex: 9,
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 1,
  },
  titleStyle: {
    textAlign: 'center',
    marginBottom: scaledSize(8),
  },
  subtitleStyle: {
    textAlign: 'center',
    color: '$goldText',
    marginBottom: scaledSize(45),
  },
  iconContainer: {
    alignSelf: 'center',
    marginBottom: scaledSize(24),
  },
  resendContainerStyle: {
    marginBottom: scaledSize(30),
    alignSelf: 'center',
  },
  linkHintStyle: {
    fontWeight: '700',
    color: '$lightGreen',
  },
  sfContainerStyle: {
    paddingTop: scaledSize(65),
  },
});

export default styles;
