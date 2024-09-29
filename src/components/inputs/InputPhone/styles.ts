import {caption, paragraph} from '@constants/styles';
import EStyleSheet from 'react-native-extended-stylesheet';
import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  containerStyle: {},
  inputStyle: {
    ...paragraph,
    //lineHeight: 0,
    color: '$white',
    flex: 1,
  },
  plusStyle: {
    ...paragraph,
    //lineHeight: 0,
    color: '$white',
    marginRight: 3,
  },
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
  errorContainerStyle: {
    alignItems: 'flex-end',
  },
  errorTitleStyle: {
    ...caption,
    color: '$error',
  },
  flagStyle: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: '$darkGray',
  },
  flagContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: scaledSize(20),
    width: 30,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 15,
  },
  countryFlagContainer: {},
});

export default styles;
