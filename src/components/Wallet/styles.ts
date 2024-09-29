import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {
    borderRadius: 16,
    height: scaledSize(188),
    marginTop: 8,
    marginBottom: 24,
    overflow: 'hidden',
    backgroundColor: '$darkSecondary',
  },
  cardContainerStyle: {
    flex: 1,
    //backgroundColor: '$darkSecondary',
    padding: scaledSize(24),
    borderRadius: 20,
    paddingTop: scaledSize(23),
    paddingBottom: scaledSize(32),
    paddingHorizontal: scaledSize(16),
  },

  titleStyle: {
    fontSize: scaledSize(13),
    marginRight: 30,
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

  copyIconContainerStyle: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default styles;
