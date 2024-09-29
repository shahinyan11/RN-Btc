import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  container: {
    height: '70%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaledSize(20),
    backgroundColor: 'rgba(37, 40, 75, 1)',
    paddingTop: 22,
    paddingBottom: 15,
  },

  blueText: {
    color: '$blueText',
  },
});

export default styles;
