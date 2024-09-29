import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: '$mediumGreen',
    flex: 1,
    height: scaledSize(40),
    borderRadius: 8,
    marginHorizontal: 5,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  focusedContainerStyle: {
    borderColor: '$lightGreen',
    borderWidth: 1,
  },
  textFieldContainerStyle: {
    flex: 1,
    paddingHorizontal: 5,
    height: 40,
    justifyContent: 'center',
  },
  iconContainerStyle: {
    width: scaledSize(35),
    height: scaledSize(35),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
