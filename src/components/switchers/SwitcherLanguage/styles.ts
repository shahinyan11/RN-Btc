import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    backgroundColor: '$darkMain',
    zIndex: 1,
  },
  itemContainerStyle: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: '$darkSecondary',
  },
  languageTitleStyle: {
    textTransform: 'uppercase',
    height: scaledSize(22),
  },
  containerStyle: {
    padding: 25,
    backgroundColor: '$darkMain',
  },
  buttonContainerStyle: {
    position: 'absolute',
    alignSelf: 'flex-end',
    borderBottomWidth: 2,
    borderColor: '$lightGreen',
    zIndex: 5,
  },
});

export default styles;
