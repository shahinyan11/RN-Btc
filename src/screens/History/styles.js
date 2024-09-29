import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    paddingHorizontal: scaledSize(20),
  },
  header: {
    height: scaledSize(60),
    justifyContent: 'center',
    marginBottom: 18,
  },
  searchContainerStyle: {
    marginTop: 12,
    marginBottom: 24,
  },
  bodyContainerStyle: {
    flex: 1,
    paddingHorizontal: scaledSize(20),
  },
  textStyle: {
    color: '$darkGray',
    marginTop: 16,
  },
  textBlue: {
    color: 'rgba(63, 167, 254, 1)',
  },
  scrollContainer: {
    paddingTop: 28,
    paddingBottom: 20,
    paddingLeft: scaledSize(20),
    paddingRight: scaledSize(4),
  },
  filterItem: {
    height: 37,
    justifyContent: 'center',
    paddingHorizontal: scaledSize(20),
    borderWidth: 1,
    borderColor: '$white',
    borderRadius: scaledSize(20),
    marginRight: 16,
  },
  activeFilterItem: {
    height: 37,
    justifyContent: 'center',
    paddingHorizontal: scaledSize(20),
    borderRadius: scaledSize(20),
    marginRight: 16,
    backgroundColor: 'rgba(63, 167, 254, 1)',
  },
});
