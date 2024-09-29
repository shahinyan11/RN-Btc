import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const styles = EStyleSheet.create({
  screenContainerStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    //paddingHorizontal: scaledSize(24),
  },

  qrHintStyle: {
    marginVertical: scaledSize(20),
    textAlign: 'center',
    marginHorizontal: '5%',
  },
  bottomRowStyle: {
    marginTop: width * 0.8,
  },
  addressStyle: {
    textAlign: 'center',
    marginVertical: scaledSize(24),
    marginBottom: scaledSize(32),
  },
  topContainerStyle: {
    backgroundColor: 'rgba(22,25,32,0.5)',
    height: '15%',
  },
  bottomContainerStyle: {
    backgroundColor: 'rgba(22,25,32,0.5)',
    height: '30%',
  },
  centerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topLeftFrame: {position: 'absolute', left: 24},
  topRightFrame: {position: 'absolute', right: 24},
  bottomLeftFrame: {position: 'absolute', bottom: 14, left: 24},
  bottomRightFrame: {position: 'absolute', bottom: 0, right: 24},
  emptyContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
