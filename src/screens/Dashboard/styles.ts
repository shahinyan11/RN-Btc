import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';
import {Platform} from 'react-native';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    flex: 1,
    padding: scaledSize(24),
  },
  labelStyle: {
    color: '$darkGray',
    textAlign: 'right',
  },
  iconContainerStyle: {
    width: scaledSize(60),
    height: scaledSize(60),
    borderRadius: scaledSize(30),
    marginBottom: 5,
    backgroundColor: 'rgba(255, 82, 82, 0.1);',
  },
  copyContainer: {
    zIndex: 10,
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 10,
    backgroundColor: 'gray',
    alignSelf: 'center',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 15,
  },
  iconActionContainerStyle: {
    alignItems: 'center',
    marginHorizontal: scaledSize(16),
  },
  headerContainerStyle: {
    marginTop: scaledSize(24),
    marginBottom: scaledSize(12),
  },
  notificationContainerStyle: {
    backgroundColor: '$mediumGreen',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  backgroundNotificationContainerStyle: {
    position: 'absolute',
    bottom: -10,
    left: 10,
    right: 10,
    zIndex: -10,
    backgroundColor: 'rgba(8, 95, 107, 0.6)',
    borderRadius: 8,
    height: 20,
  },
  notificationTextStyle: {
    marginTop: 5,
  },
  unreadNotificationStyle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '$lightGreen',
  },
  lastTransaction: {
    letterSpacing: -1,
  },
  viewAll: {
    fontSize: scaledSize(14),
    letterSpacing: -1,
  },
});

export default styles;
