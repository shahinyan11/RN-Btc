import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';
import {Platform} from 'react-native';

const styles = EStyleSheet.create({
  container: {
    width: scaledSize(105),
    height: scaledSize(115),
    paddingHorizontal: scaledSize(12),
    paddingVertical: scaledSize(20),
    justifyContent: 'space-between',
    borderRadius: scaledSize(20),
    borderWidth: 1,
    borderColor: 'rgba(63, 167, 254, 0.24)',
  },

  text: {
    fontSize: scaledSize(13),
  },
});

export default styles;
