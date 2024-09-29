import {scaledSize} from '@utils';
import {Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  modalStyle: {
    flex: 1,
  },
  modalBackgroundStyle: {
    flex: 1,
    backgroundColor: '$backDropColor',
    justifyContent: 'flex-end',
  },
  modalWindowStyle: {
    backgroundColor: '$darkSecondary',
    paddingTop: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: scaledSize(24),
    maxHeight: Dimensions.get('window').height * 0.85,
    paddingBottom: 30,
  },
  modalControlStyle: {
    width: 50,
    height: 5,
    borderRadius: 50,
    backgroundColor: '$darkGray',
    marginVertical: 10,
    alignSelf: 'center',
  },
});

export default styles;
