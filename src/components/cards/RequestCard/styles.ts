import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    backgroundColor: '$mediumGreen',
    minHeight: scaledSize(115),
    borderRadius: 12,
    justifyContent: 'space-around',
    marginVertical: scaledSize(24),
    padding: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
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
  },
  currencySwitcherContainerStyle: {
    marginVertical: 6,
    backgroundColor: '$greenRegular',
    position: 'absolute',
    right: 0,
    width: 50,
  },
  rowContainerStyle: {
    marginBottom: 8,
  },
  iconContainerStyle: {
    marginLeft: 8,
  },
});

export default styles;
