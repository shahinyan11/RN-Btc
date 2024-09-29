import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import SafeContainer from '@components/containers/SafeContainer';
import Row from '@components/containers/Row';
import Switcher from '@components/switchers/Switcher';
import Divider from '@components/Divider';
import Icon from '@components/icons/Icon';
import Text from '@components/texts/Text';

import styles from './styles';

import {selectPin, selectPINSettings, setAppValue} from '@store/app';

export default function ChangePIN({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const isPinActive = useSelector(selectPINSettings);
  const pin = useSelector(selectPin);

  const onChangePinStatus = () => {
    dispatch(setAppValue({field: 'pinEnable', data: !isPinActive}));
    if (isPinActive) {
      dispatch(setAppValue({field: 'pin', data: ''}));
    }
    if (!isPinActive) {
      onSubmit();
    }
  };

  const onSubmit = () => {
    navigation.navigate('SetPin');
  };

  const darkGray = EStyleSheet.value('$darkGray');

  return (
    <SafeContainer containerStyle={styles.safeContainerStyle}>
      <Row justifyContent="space-between">
        <Text type="h4">{t('content.usePin')}</Text>
        <Switcher active={isPinActive} onPress={onChangePinStatus} />
      </Row>
      {isPinActive && Boolean(pin) && (
        <>
          <Divider />

          <TouchableOpacity
            onPress={onSubmit}
            style={styles.buttonContainerStyle}>
            <Row justifyContent="space-between">
              <Text type="label">{t('resetPin')}</Text>
              <Icon name="arrow-right" size={20} color={darkGray} />
            </Row>
          </TouchableOpacity>
        </>
      )}
    </SafeContainer>
  );
}
