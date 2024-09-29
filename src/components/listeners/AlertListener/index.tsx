import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, SafeAreaView, Pressable, StatusBar} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';

import Text from '@components/texts/Text';
import Link from '@components/buttons/Link';

import {selectIsMessageVisible, selectMessage, setAppValue} from '@store/app';

import styles from './styles';

const AlertListener = () => {
  const alertMessage = useSelector(selectMessage);
  const isAlertVisible = useSelector(selectIsMessageVisible);

  const {t} = useTranslation();

  const dispatch = useDispatch();

  const onHideMessage = () => {
    dispatch(setAppValue({field: 'isMessageVisible', data: false}));
  };

  if (!isAlertVisible) return null;

  return (
    <View style={styles.containerStyle}>
      <SafeAreaView>
        <Pressable style={styles.messageContainerStyle} onPress={onHideMessage}>
          <Text type="label">Message:</Text>
          <Text type="description" style={styles.messageStyle}>
            {alertMessage}
          </Text>
          <Link
            title={t('close')}
            containerStyle={styles.btnContainerStyle}
            onPress={onHideMessage}
          />
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

export default AlertListener;
