import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  imageContainer: {flex: 1, paddingBottom: 50},
  sfContainerStyle: {
    flex: 1,
    paddingHorizontal: scaledSize(24),
  },

  sfContainerShakeStyle: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  mainContainerStyle: {
    flex: 1,
    justifyContent: 'center',
  },
  hintStyle: {
    textAlign: 'center',
  },
  centerContainerStyle: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgb(175, 27, 251)',
    borderRadius: 500,
    alignSelf: 'center',
  },
  shakingStyle: {
    color: 'rgb(175, 27, 251)',
    marginTop: 10,
  },
  //
  circleStyle: {
    borderWidth: 1,
    borderColor: 'rgb(175, 27, 251)',
    borderRadius: 500,
    width: 250,
    height: 250,
    position: 'absolute',
    alignSelf: 'center',
  },
  secondCircleStyle: {
    width: 350,
    height: 350,
    borderWidth: 1,
    borderColor: 'rgb(175, 27, 251)',
    borderRadius: 500,
    position: 'absolute',
    alignSelf: 'center',
  },
  threeCircleStyle: {
    width: 450,
    height: 450,
    borderWidth: 1,
    borderColor: 'rgb(175, 27, 251)',
    borderRadius: 500,
    position: 'absolute',
    alignSelf: 'center',
  },
  foureCircleStyle: {
    width: 550,
    height: 550,
    borderWidth: 1,
    borderColor: 'rgb(175, 27, 251)',
    borderRadius: 500,
    position: 'absolute',
    alignSelf: 'center',
  },
  topContainerStyle: {
    alignItems: 'center',
    paddingTop: '20%',
  },
  titleStyle: {
    marginVertical: scaledSize(24),
  },
  contactsContainerStyle: {
    flex: 1,
    marginVertical: 20,
  },
  linkContainerStyle: {
    alignSelf: 'center',
  },
  contactContainerStyle: {
    backgroundColor: '$darkSecondary',
    padding: scaledSize(10),
    borderRadius: 12,
  },
  closeContainerStyle: {
    position: 'absolute',
    top: 40,
    right: 40,
    padding: 5,
    zIndex: 100,
  },
  sfDisabledContainerStyle: {
    flex: 1,
    paddingHorizontal: scaledSize(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  geolocationText: {
    textAlign: 'center',
    marginBottom: scaledSize(20),
  },
  disabledCenterContainerStyle: {
    alignItems: 'center',
    marginTop: scaledSize(20),
  },
  geolocationLinkContainerStyle: {
    marginTop: scaledSize(10),
  },
});

export default styles;
