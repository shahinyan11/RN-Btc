import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '../../utils';
import fonts from '@constants/fonts';

const styles = EStyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  cornerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontFamily: fonts.InterRegular,
    marginHorizontal: 20,
    fontWeight: '500',
    fontSize: scaledSize(20),
    letterSpacing: -scaledSize(0.32),
    color: '$white',
  },
});

export default styles;
