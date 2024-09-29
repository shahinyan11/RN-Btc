import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: '$mediumGreen',
    minHeight: scaledSize(188),
    borderRadius: 12,
    justifyContent: 'space-around',
    marginVertical: scaledSize(24),
    padding: 16,
  },

  balanceTextStyle: {
    color: '$darkGray',
    textAlign: 'center',
  },
  subBalanceTextStyle: {
    color: '$darkGray',
    textAlign: 'center',
    marginTop: 5,
  },
  inputStyle: {
    alignSelf: 'center',
    fontSize: scaledSize(30),
    letterSpacing: -1,
    color: '$darkGray',
    fontWeight: '600',
    marginVertical: 6,
  },
  subValueStyle: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: scaledSize(13),
  },
  comissionStyle: {
    textAlign: 'center',
    color: '$darkGray',
    marginTop: 8,
  },
  currencySwitcherContainerStyle: {
    marginVertical: 6,
    backgroundColor: '$greenRegular',
  },
  rowContainerStyle: {
    marginBottom: 8,
  },
  cashContainerStyle: {
    marginVertical: scaledSize(10),
  },
  coinContainerStyle: {
    marginLeft: 8,
  },
});

export default styles;
