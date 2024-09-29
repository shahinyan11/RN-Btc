import {buttonTitle, paragraph} from '@constants/styles';
import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  inputStyle: {
    ...paragraph,
    color: 'white',
    flex: 1,
  },
  inputCommentContainerStyle: {
    minHeight: scaledSize(56),
    borderTopColor: '$darkSecondary',
    borderTopWidth: 1,
    paddingVertical: 16,
    paddingHorizontal: scaledSize(15),
    justifyContent: 'space-between',
  },
  buttonTitleStyle: {
    ...buttonTitle,
    color: '$lightGreen',
  },
  buttonContainerStyle: {
    marginLeft: 20,
  },
});

export default styles;
