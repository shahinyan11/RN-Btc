import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  titleStyle: {
    textAlign: 'center',
    lineHeight: 40,
  },
  subtitleStyle: {
    textAlign: 'center',
    lineHeight: 25,
  },
  buttonContainerStyle: {
    marginVertical: scaledSize(20),
  },
  headerInfoStyle: {
    marginVertical: scaledSize(15),
  },
  textStyle: {
    lineHeight: 20,
  },
});

export default styles;
