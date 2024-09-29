import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useTranslation } from 'react-i18next';

import Text from '@components/texts/Text';
import Button from '@components/buttons/Button';
import SafeContainer from '@components/containers/SafeContainer';

import { scaledSize } from '@utils';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    padding: scaledSize(24),
    backgroundColor: '$darkMain',
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainerStyle: {
    marginTop: 30,
  },
  descriptionStyle: {
    marginTop: 16,
    color: '$darkGray',
  },
});

const ErrorScreenComponent = (props: {
  error: Error;
  resetError: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <Text type="h1">{t('errorTitle')}</Text>
      <Text type="h5" style={styles.descriptionStyle}>
        {props.error.toString()}
      </Text>
      <Button
        onPress={props.resetError}
        title={t('tryAgain')}
        containerStyle={styles.buttonContainerStyle}
      />
    </SafeContainer>
  );
};

export default ErrorScreenComponent;
