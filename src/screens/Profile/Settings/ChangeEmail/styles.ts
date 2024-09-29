import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  btnContainerStyle: {
    marginTop: scaledSize(24),
  },
  linkContainerStyle: {
    marginTop: scaledSize(32),
    alignSelf: 'center',
  },
  enterCodeViewStyle: {
    marginTop: scaledSize(24),
  },
  hintStyle: {
    marginVertical: scaledSize(24),
  },
});

export default styles;
