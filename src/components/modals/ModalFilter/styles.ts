import { scaledSize } from '@utils';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const { width } = Dimensions.get('window');

const styles = EStyleSheet.create({
  headerTitleStyle: {
    textAlign: 'center',
    flex: 1,
  },
  modalWindowStyle: {
    backgroundColor: '$darkMain',
  },
  calendarContainerStyle: {
    borderRadius: 8,
    marginVertical: 24,
    width: width - scaledSize(48),
    paddingBottom: 24,
  },
  btnFilterContainerStyle: {
    marginVertical: scaledSize(20),
    alignSelf: 'center',
  },
  iconBackContainerStyle: {
    backgroundColor: '$darkSecondary',
    padding: 3,
    borderRadius: 3,
  },
  rightContainerStyle: {
    width: 26,
  },
  bottomContainerStyle: {
    marginTop: scaledSize(32),
  },
});

export default styles;
