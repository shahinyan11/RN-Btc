import EStyleSheet from 'react-native-extended-stylesheet';

import {scaledSize} from '@utils';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    flex: 1,
    backgroundColor: '$darkMain',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaledSize(40),
  },
  titleStyle: {
    marginVertical: scaledSize(20),
  },
  descriptionStyle: {
    textAlign: 'center',
    marginBottom: scaledSize(30),
  },
});

export default styles;
