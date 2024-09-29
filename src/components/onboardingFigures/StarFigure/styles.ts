import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    zIndex: 2,
    width: 0,
    height: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalContainer: {
    width: 1,
  },
  horizontalContainer: {
    height: 1,
  },
});

export default styles;
