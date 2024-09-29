import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    height: scaledSize(36),
    backgroundColor: '$mediumGreen',
    borderRadius: 8,
    alignItems: 'stretch',
    marginVertical: 8,
  },
  activeTabContainerStyle: {
    backgroundColor: '$greenRegular',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContainerStyle: {
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputContainerStyle: {
    marginTop: 8,
    marginBottom: 24,
  },
});

export default styles;
