import React from 'react';
import {Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/texts/Text';

import {scaledSize} from '@utils';
import {useTranslation} from 'react-i18next';

const styles = EStyleSheet.create({
  sfContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: scaledSize(24),
  },
  textStyle: {
    marginTop: 15,
  },
  foundIcon: {height: scaledSize(150), width: scaledSize(150)},
});

export const EmptyList = () => {
  const {t} = useTranslation();
  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <Image
        source={require('../../../assets/images/found.png')}
        style={styles.foundIcon}
      />
      <Text type="h4" style={styles.textStyle}>
        {t('sorryNothingWasFound')}
      </Text>
    </SafeContainer>
  );
};
