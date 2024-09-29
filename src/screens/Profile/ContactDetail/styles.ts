import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  iconActionContainerStyle: {
    marginTop: scaledSize(25),
    width: 100,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  iconContainerStyle: {
    width: scaledSize(60),
    height: scaledSize(60),
    borderRadius: scaledSize(30),
    marginBottom: 5,
    backgroundColor: 'rgba(255, 82, 82, 0.1);',
  },
  titleStyle: {
    textAlign: 'center',
  },
  flexOne: {
    flex: 1,
  },
  buttonsContainerStyle: {
    flexWrap: 'wrap',
    flex: 0,
  },
  actionButtonStyle: {
    marginHorizontal: scaledSize(16),
  },
  moreContainerStyle: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: scaledSize(32),
    height: scaledSize(32),
    borderRadius: scaledSize(3),
    backgroundColor: '$darkSecondary',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moreBtnContainerStyle: {
    paddingVertical: 16,
    justifyContent: 'center',
  },
  modalWindowStyle: {
    backgroundColor: '$darkMain',
    minHeight: '80%',
    paddingTop: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: scaledSize(24),
    paddingBottom: 30,
  },
  modalMoreWindowStyle: {
    backgroundColor: '$darkMain',
  },
  bottomRowContainerStyle: {
    marginTop: 20,
  },
});

export default styles;
