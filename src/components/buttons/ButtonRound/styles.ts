import {h5} from '@constants/styles';
import {scaledSize} from '@utils';

import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    width: scaledSize(80),
    height: scaledSize(80),
    borderRadius: scaledSize(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '$goldMain',
  },
  contentContainer: {
    backgroundColor: '$darkMain',
    width: scaledSize(78),
    height: scaledSize(78),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaledSize(40),
  },
  onPressStyle: {backgroundColor: '$lightGreen'},
  focusedContainerStyle: {
    width: scaledSize(80),
    height: scaledSize(80),
    borderRadius: scaledSize(40),
    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '$goldMain',
  },
  titleStyle: {
    ...h5,
    fontSize: 13,
    textAlign: 'center',
    color: 'white',
    marginTop: 8,
  },
});

export default styles;
