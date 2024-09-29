import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: '$darkMain',
    height: '90%',
  },
  centerContainerStyle: {
    marginHorizontal: 12,
  },
  userContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '$mediumGreen',
    padding: scaledSize(24),
    borderRadius: 12,
    marginTop: scaledSize(32),
  },
  usernameStyle: {
    color: '$darkGray',
    marginTop: 4,
  },
  headerTitleStyle: {
    marginTop: scaledSize(20),
    marginBottom: scaledSize(12),
  },
  buttonContainerStyle: {
    marginVertical: scaledSize(32),
  },
  btnContainer: {flex: 1},
  emptyContainer: {width: scaledSize(24)},
  timeStyle: {
    color: '$goldLight',
  },
  iconContainerStyle: {
    width: scaledSize(80),
    height: scaledSize(80),
    borderRadius: scaledSize(40),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '$alertBG',
    alignSelf: 'center',
    marginBottom: scaledSize(24),
  },
  hintStyle: {
    textAlign: 'center',
    marginTop: scaledSize(20),
  },
});

export default styles;
