import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  activeContainerStyle: {
    height: 30,
    width: 54,
    borderRadius: 15,
    backgroundColor: '$greenRegular',
    justifyContent: 'center',
    padding: 2,
    alignItems: 'flex-end',
  },
  disableContainerStyle: {
    height: 30,
    width: 54,
    borderRadius: 15,
    backgroundColor: '$greenRegular',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  activeDot: {
    width: 24,
    height: 24,
    borderRadius: 22,
    backgroundColor: '$lightGreen',
  },
  disableDot: {
    width: 24,
    height: 24,
    borderRadius: 22,
    backgroundColor: '$darkGray',
  },
});

export default styles;
