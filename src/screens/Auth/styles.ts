import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils';
import {h3} from '@constants/styles';

export const modalStyle = EStyleSheet.create({
  titleStyle: {
    ...h3,
    color: 'white',
    textAlign: 'center',
  },
  linkContainerStyle: {
    marginVertical: 24,
    alignSelf: 'center',
  },
});

const styles = EStyleSheet.create({
  containerStyle: {
    // flex: 1,
    justifyContent: 'center',
    zIndex: 1,
  },
  secondCircleStyle: {
    borderWidth: 2,
    borderColor: '$goldMain',
    flex: 1,
    borderRadius: scaledSize(75),
  },
  logoStyle: {width: 180, height: 180, alignSelf: 'center'},
  titleStyle: {
    marginTop: 24,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleStyle: {
    color: '$goldText',
    textAlign: 'center',
  },
  buttonGroupContainer: {
    marginTop: scaledSize(60),
  },
  linkContainerStyle: {
    alignSelf: 'center',
    marginTop: scaledSize(24),
  },
  dividerTextStyle: {
    textTransform: 'uppercase',
  },
  btnContainerStyle: {
    marginVertical: 6,
  },
});

export default styles;
