import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  modalTitleStyle: {
    textAlign: 'center',
    color: 'white',
  },
  containerStyle: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  flexOne: {
    flex: 1,
  },

  cameraIconContainerStyle: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pictureContainerStyle: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  pictureStyle: {
    width: 50,
    height: 50,
  },
  iconContainerStyle: {
    backgroundColor: '$lightGreen',
    borderRadius: 9,
    padding: 3,
    borderWidth: 2,
    borderColor: '$darkSecondary',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -3,
    top: -3,
    zIndex: 100,
  },

  addText: {color: '$lightGreen'},
  activeCameraIconContainerStyle: {
    borderWidth: 1,
    borderColor: '$darkGrayText',
    borderStyle: 'dashed',

    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  reportModalRow: {
    alignItems: 'flex-end',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalReportWindowStyle: {
    backgroundColor: '$darkMain',
  },
  commentStyle: {
    borderTopWidth: 0,
  },
  modalWindowStyle: {
    backgroundColor: '$darkMain',
    minHeight: '40%',
    paddingTop: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: scaledSize(24),
    paddingBottom: 30,
  },
});

export default styles;
