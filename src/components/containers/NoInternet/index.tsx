import React from 'react';
import {useTranslation} from 'react-i18next';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';

import Text from '@components/texts/Text';
import SafeContainer from '@components/containers/SafeContainer';
import IconGradient from '@components/icons/IconGradient';
import Button from '@components/buttons/Button';

import styles from './styles';
import {setAppValue} from '@store/app';

export default function NoInternet() {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const onCheck = () => {
    NetInfo.fetch().then(({isConnected, isInternetReachable}) => {
      dispatch(
        setAppValue({
          field: 'isInternetEnabled',
          data: isConnected && isInternetReachable,
        }),
      );
    });
  };

  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <IconGradient name="shield" size={170} />
      <Text type="h2" style={styles.titleStyle}>
        {t('noInternet')}
      </Text>
      <Text type="description" style={styles.descriptionStyle}>
        {t('noInternetDescription')}
      </Text>

      <Button title={t('checkConnection')} onPress={onCheck} />
    </SafeContainer>
  );
}
