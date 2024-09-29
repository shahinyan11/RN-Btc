import {scaledSize} from '@utils';
import EStyleSheet from 'react-native-extended-stylesheet';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    marginTop: scaledSize(24),
    justifyContent: 'space-between',
  },
  subtitleStyle: {
    marginTop: 8,
  },

  wordsContainerStyle: {
    marginVertical: scaledSize(32),
    flexDirection: 'row',
  },
  checkBoxContainerStyle: {
    marginVertical: scaledSize(27),
  },
  linkContainerStyle: {
    alignSelf: 'center',
    marginTop: 20,
  },
  rowContainerStyle: {
    //flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  itemKeywordStyle: {
    marginRight: 6,
    marginVertical: 6,
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '$mediumGreen',
  },

  linkTextStyle: {
    fontWeight: '700',
  },
  rulesStyles: {
    marginLeft: 10,
    flex: 1,
  },
  rulesContainerStyle: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    marginVertical: scaledSize(32),
  },
});

export default styles;
