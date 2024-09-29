import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    paddingHorizontal: scaledSize(24),
  },
  btnContainerStyle: {
    marginTop: scaledSize(24),
  },
  labelStyles: {
    color: '$darkGray',
  },
  rowContainerStyle: {
    marginVertical: 5,
  },
  linkStyle: {
    fontSize: scaledSize(12),
  },
  searchContainerStyle: {
    flex: 1,
  },
});

export default styles;
