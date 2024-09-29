import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Input from '@components/inputs/Input';
import Button from '@components/buttons/Button';
import KeyboardListener from '@components/listeners/KeyboardListener';

import styles from './styles';

import {checkUrlValidity, selectBaseUrl, setBaseUrl} from '@store/app';
import {Text, TouchableOpacity, View} from 'react-native';
import {IconError, IconInProcess} from '@assets/icons';
import {onProxyStatus, selectDashboard} from '@store/user';
import Icon from '@components/icons/Icon';
import EStyleSheet from 'react-native-extended-stylesheet';
import Config from 'react-native-config';

export default function Proxy() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [url, setUrl] = useState('');
  const baseUrl = useSelector(selectBaseUrl);
  const {proxy_status} = useSelector(selectDashboard);

  useEffect(() => {
    setUrl(baseUrl);
  }, [baseUrl]);

  const onSave = () => {
    dispatch(checkUrlValidity(url));
  };

  const onSubmit = () => {
    dispatch(onProxyStatus());
  };

  const renderAfter = () => {
    if (baseUrl !== url) {
      return (
        <TouchableOpacity onPress={onSave}>
          <Text style={styles.save}>Save</Text>
        </TouchableOpacity>
      );
    }

    return (
      <Icon
        containerStyle={styles.icon}
        disabled={false}
        name={'refresh'}
        color={EStyleSheet.value('$goldLight')}
        size={24}
        onPress={() => dispatch(setBaseUrl(Config.API_DOMAIN))}
      />
    );
  };

  return (
    <SafeContainer>
      <KeyboardListener>
        {proxy_status === 1 && (
          <Input
            value={url}
            onPressIcon={() => {}}
            onChangeText={setUrl}
            label={t('content.enter_proxy_address')}
            addAfter={renderAfter()}
            placeholder={'http'}
          />
        )}
        <View>
          {[0, 2].includes(proxy_status) && (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              {proxy_status === 2 ? <IconInProcess /> : <IconError />}
              <Text style={styles.text}>
                {proxy_status === 2
                  ? t('content.proxy_desc_in_process')
                  : t('content.proxy_desc_rejected')}
              </Text>
            </View>
          )}

          {!proxy_status && (
            <Button
              onPress={onSubmit}
              title={t('content.use_proxy')}
              buttonContainerStyle={styles.buttonContainer}
              disabledButtonContainerStyle={styles.disabledButtonContainer}
            />
          )}
        </View>
      </KeyboardListener>
    </SafeContainer>
  );
}
