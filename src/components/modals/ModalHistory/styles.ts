import {scaledSize} from '@utils';
import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  iconContainerStyle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  historyTypeStyle: {
    marginTop: scaledSize(24),
    marginBottom: scaledSize(8),
  },
  dateStyle: {
    fontSize: scaledSize(12),
    color: '$goldText',
  },

  userContainerStyle: {
    flex: 1,
    marginLeft: 10,
  },
  commentStyle: {
    marginTop: scaledSize(24),
    color: '$darkGray',
    marginBottom: 5,
  },
  hintStyle: {
    color: '$darkGray',
    fontSize: scaledSize(13),
  },
  mainContainerStyle: {
    height: Dimensions.get('window').height * 0.8,
  },
  statusStyle: {
    textAlign: 'center',
    marginTop: scaledSize(20),
    color: '$alert',
  },
  modalWindowStyle: {
    backgroundColor: '$darkMain',
  },
  usernameStyle: {
    marginLeft: 8,
  },
  rowContainerStyle: {
    alignItems: 'flex-start',
  },
  titleStyle: {
    marginBottom: 10,
  },
});

export default styles;
