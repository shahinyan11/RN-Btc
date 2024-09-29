import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

export const modalStyle = EStyleSheet.create({
  titleStyle: {
    textAlign: 'center',
  },
  bodyContainerStyle: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  emailStyle: {
    color: '$lightGreen',
    marginTop: scaledSize(12),
    marginBottom: scaledSize(24),
  },
  copyContainer: {
    position: 'absolute',
    top: 50,
    backgroundColor: 'gray',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 15,
  },
  imageHelp: {
    marginVertical: 16,
    height: scaledSize(167),
    width: scaledSize(167),
  },
});

const styles = EStyleSheet.create({
  safeContainerStyle: {
    marginTop: scaledSize(30),
  },
  hintStyle: {
    alignSelf: 'center',
  },
  menuContainerStyle: {
    flexGrow: 1,
  },
  notificationHintStyle: {
    color: '$darkGray',
    marginLeft: scaledSize(30),
  },
});

export default styles;
