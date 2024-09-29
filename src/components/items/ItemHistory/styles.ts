import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  descriptionStyle: {
    marginTop: 3,
  },
  prefixStyle: {
    color: '$darkGray',
  },
  balanceStyle: {
    fontSize: scaledSize(12),
    marginTop: 3,
  },
  rightBlockStyle: {
    alignItems: 'flex-end',
  },
  sendTextStyle: {
    color: '$error',
  },
  receiveTextStyle: {
    color: '$success',
  },
  commentStyle: {
    color: '$darkGray',
    fontSize: scaledSize(13),
    marginTop: 3,
  },
  statusStyle: {
    marginTop: 3,
    color: '$alert',
  },
  conflictedTextStyle: {
    color: '$alert',
  },
  confirmationTextStye: {
    marginTop: scaledSize(3),
    marginRight: scaledSize(4),
    color: '$goldText',
  },
  confirmationItemStyle: {
    flex: 1,
    marginLeft: scaledSize(5),
    height: scaledSize(10),
    borderWidth: 1,
    borderColor: '#0e2b5c',
  },
  confirmationActiveItemStyle: {
    borderColor: '#027D42',
    backgroundColor: '#027D42',
  },
});

export default styles;
