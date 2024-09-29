import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  modalTitleStyle: {
    textAlign: 'center',
    color: 'white',
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
    backgroundColor: '$goldMain',
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
  activeCameraIconContainerStyle: {
    borderWidth: 1,
    borderColor: '$darkGray',
    borderStyle: 'dashed',
    //borderRadius: 3,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  reportModalRow: {
    alignItems: 'flex-end',
  },
  modalReportWindowStyle: {
    backgroundColor: '$darkMain',
  },
  commentStyle: {
    borderTopWidth: 0,
  },
});

export default styles;
