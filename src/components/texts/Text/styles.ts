import EStyleSheet from 'react-native-extended-stylesheet';

import {
  buttonTitle,
  caption,
  h1,
  h2,
  h3,
  h4,
  h5,
  label,
  paragraph,
  textField,
} from '@constants/styles';

const styles = EStyleSheet.create({
  h1: {
    ...h1,
    color: 'white',
  },
  h2: {
    ...h2,
    color: 'white',
  },
  h3: {
    ...h3,
    color: 'white',
  },
  h4: {
    ...h4,
    color: 'white',
  },
  h5: {
    ...h5,
    color: 'white',
  },
  textField: {
    ...textField,
    color: '$darkGray',
  },
  paragraph: {
    ...paragraph,
    color: 'white',
  },
  caption: {
    ...caption,
    color: 'white',
  },
  description: {
    ...paragraph,
    color: '$goldText',
  },
  buttonTitle: {
    ...buttonTitle,
    color: 'white',
  },
  label: {
    ...label,
    color: 'white',
  },
});

export default styles;
