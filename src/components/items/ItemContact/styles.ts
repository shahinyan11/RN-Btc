import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  infoContainerStyle: {
    flex: 1,
    marginHorizontal: 12,
  },
  containerStyle: {
    paddingVertical: 8,
    //flex: 1,
  },
  usernameStyle: {
    color: '$darkGray',
    marginTop: 5,
  },
  activeAddressStyle: {
    color: '$darkGrayText',
    marginTop: 5,
    fontWeight: 'bold',
  },
  coinIconContainerStyle: {
    marginRight: 5,
    marginBottom: -5,
  },
  prefixStyle: {
    marginRight: 8,
    color: '$darkGray',
  },
});

export default styles;
