import {caption, paragraph} from '@constants/styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {},
  inputContainerStyle: {
    flexDirection: 'row',
    backgroundColor: '$mediumGreen',
    paddingHorizontal: 15,
    minHeight: scaledSize(48),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputFocusedContainerStyle: {
    flexDirection: 'row',
    backgroundColor: '$mediumGreen',
    paddingHorizontal: 15,
    minHeight: scaledSize(48),
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '$lightGreen',
    justifyContent: 'space-between',
  },
  inputErrorContainerStyle: {
    flexDirection: 'row',
    backgroundColor: '$mediumGreen',
    paddingHorizontal: 15,
    minHeight: scaledSize(48),
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '$error',
    justifyContent: 'space-between',
  },
  errorTitleStyle: {
    ...caption,
    color: '$error',
  },
  inputStyle: {
    ...paragraph,
    //lineHeight: 0,
    color: '$white',
    flex: 1,
  },
  errorContainerStyle: {
    alignItems: 'flex-end',
  },
  searchIconContainerStyle: {
    marginRight: 15,
  },
  closeIconContainerStyle: {
    marginLeft: 15,
    backgroundColor: '$darkGray',
    padding: 5,
    borderRadius: 30,
  },
  filterIconContainerStyle: {
    marginLeft: 15,
  },
});

export default styles;
