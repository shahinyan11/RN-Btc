import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const nw_styles = EStyleSheet.create({
  containerStyle: {
    marginTop: 8,
    marginBottom: 24,
  },
  cardContainerStyle: {
    borderRadius: 20,
    paddingTop: scaledSize(23),
    paddingBottom: scaledSize(32),
    paddingHorizontal: scaledSize(16),
  },
  titleStyle: {
    marginTop: 28,
    marginBottom: 8,
    fontSize: scaledSize(13),
  },
  subtitleStyle: {
    marginTop: 5,
    color: '$darkGray',
  },
  iconContainerStyle: {
    marginLeft: 5,
  },
  bitcoinContainerStyle: {
    position: 'absolute',
    bottom: -50,
    right: -50,
  },

  walletAddress: {
    paddingTop: 16,
    paddingBottom: 20,
    marginBottom: 24,
    paddingLeft: scaledSize(16),
    paddingRight: scaledSize(24),
    borderRadius: scaledSize(20),
  },

  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },

  copyIconContainerStyle: {
    top: 24,
    right: 24,
    position: 'absolute',
  },
});

export default nw_styles;
