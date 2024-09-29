import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {
    width: scaledSize(25),
    height: scaledSize(25),
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '$lightGreen',
  },
  activeContainerStyle: {
    width: scaledSize(25),
    height: scaledSize(25),
    borderRadius: 4,
    backgroundColor: '$lightGreen',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStyle: {
    marginLeft: 10,
  },
});

export default styles;
