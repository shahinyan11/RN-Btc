import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    flex: 1,
    padding: scaledSize(24),
  },
  contactContainerStyle: {
    minHeight: scaledSize(80),
    justifyContent: 'center',
  },
  contactBodyContainer: {
    marginLeft: 10,
    flex: 1,
  },
  textStyle: {
    color: '$darkGray',
    marginTop: 16,
  },
  phoneLabelStyle: {
    textTransform: 'capitalize',
    minWidth: 100,
  },
  phoneNumberContainerStyle: {
    marginTop: 5,
  },
  phoneContainerStyle: {
    marginVertical: 10,
  },
  phoneStyle: {
    flex: 1,
  },
});

export default styles;
