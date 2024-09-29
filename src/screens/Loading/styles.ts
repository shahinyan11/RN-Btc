import EStyleSheet from 'react-native-extended-stylesheet';

import fonts from '@constants/fonts';
import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161920',
  },
  fillStyle: {
    fontFamily: fonts.montMedium,
    fontSize: 20,
    color: '#D8AD5A',
  },
  image: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default styles;
