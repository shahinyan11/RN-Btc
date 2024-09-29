import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {
    justifyContent: 'space-between',
  },
  topBlock: {
    marginTop: scaledSize(65),
  },
  inputContainerStyle: {
    marginTop: scaledSize(32),
  },
  linkContainerStyle: {
    marginTop: 12,
    alignSelf: 'flex-end',
  },
  loginSeedContainerStyle: {
    alignSelf: 'center',
    marginVertical: scaledSize(20),
  },
  buttonContainerStyle: {
    marginTop: scaledSize(34),
  },
  welcomeTitleStyle: {
    lineHeight: scaledSize(40),
  },
});

export default styles;
