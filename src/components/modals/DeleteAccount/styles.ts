import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  content: {
    padding: 20,
    paddingRight: 40,
    backgroundColor: '$darkSecondary',
    borderRadius: 8,
    marginHorizontal: 20,
  },

  title: {
    color: '$white',
    marginTop: 22,
    marginBottom: 12,
  },

  text: {
    color: '$white',
    marginBottom: 16,
  },
  icon: {
    position: 'absolute',
    top: 16,
    right: 12,
  },
});

export default styles;
