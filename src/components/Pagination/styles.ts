import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  pageDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginHorizontal: 8,
    padding: 1,
  },
  activeDot: {
    width: 17,
    height: 7,
    borderRadius: 3.5,
  },
  centerViewStyle: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {width: 4, height: 4, backgroundColor: 'black'},
});

export default styles;
