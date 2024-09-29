import {caption, paragraph} from '@constants/styles';
import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  containerStyle: {
    marginVertical: 8,
  },
  inputContainerStyle: {
    flexDirection: 'row',
    // backgroundColor: '$mediumGreen',
    backgroundColor: '$secondaryBlue',
    paddingHorizontal: 15,
    minHeight: scaledSize(48),
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputFocusedContainerStyle: {
    flexDirection: 'row',
    // backgroundColor: '$mediumGreen',
    backgroundColor: '$secondaryBlue',
    paddingHorizontal: 15,
    minHeight: scaledSize(48),
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    // borderColor: '$lightGreen',
    borderColor: '$lightBlue',
    justifyContent: 'space-between',
  },
  inputErrorContainerStyle: {
    flexDirection: 'row',
    backgroundColor: '$darkSecondary',
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
  },
  errorContainerStyle: {
    alignItems: 'flex-end',
  },
  labelStyle: {
    marginBottom: 6,
    marginTop: scaledSize(10),
  },
});

export default styles;
