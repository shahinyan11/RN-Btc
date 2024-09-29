import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {},
  titleStyle: {
    marginVertical: scaledSize(20),
  },

  topBlockStyle: {
    alignItems: 'center',
    marginBottom: scaledSize(64),
    marginTop: scaledSize(24),
  },
  subtitleStyle: {
    textAlign: 'center',
  },
});

export default styles;
