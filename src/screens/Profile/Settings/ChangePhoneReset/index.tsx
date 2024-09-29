import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';
import {removeListener, startOtpListener} from 'react-native-otp-verify';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import SafeContainer from '@components/containers/SafeContainer';
import Button from '@components/buttons/Button';
import Text from '@components/texts/Text';

import styles from './styles';
import {codeValid} from '@utils';
import {onChangePhone, selectProfile} from '@store/auth';
import {setAlertMessage} from '@store/app';

export default function ChangePhoneReset({
  navigation,
  route,
}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const {nextPhone, isPhoneExist} = route.params;
  const [code, setCode] = useState('');
  const [isValid, setValid] = useState(false);
  const dispatch = useDispatch();
  const {phone: currentPhone} = useSelector(selectProfile);
  const ref = useBlurOnFulfill({code, cellCount: 6});

  useEffect(() => {
    startOtpListener(message => {
      const otp = /(\d{6})/g.exec(message)?.[1];
      otp && setCode(otp);
    });

    return () => removeListener();
  });

  const onSuccess = () => {
    dispatch(
      setAlertMessage(
        t('content.successChangePhone', {phone: `+${nextPhone}`}),
      ),
    );
    navigation.goBack();
  };

  const onSubmit = () => {
    dispatch(
      onChangePhone(
        {
          phone: nextPhone,
          code,
        },
        onSuccess,
      ),
    );
  };

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });

  useEffect(() => {
    setValid(codeValid(code));
  }, [code]);

  return (
    <SafeContainer>
      <Text type="description" style={styles.subtitleStyle}>
        {t('content.codeSendTo', {
          phone: `+${isPhoneExist ? currentPhone : nextPhone}`,
        })}
      </Text>
      <CodeField
        ref={ref}
        {...props}
        caretHidden={true}
        value={code}
        onChangeText={setCode}
        cellCount={6}
        rootStyle={styles.codeContainerStyle}
        keyboardType="default"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <View
            key={index}
            style={[
              styles.codeItemContainerStyle,
              isFocused && styles.codeItemContainerStyleFocused,
            ]}>
            <Text
              style={styles.codeItemStyle}
              onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused && <Cursor />)}
            </Text>
          </View>
        )}
      />
      <Button
        disabled={!isValid}
        title={t('content.confirm')}
        onPress={onSubmit}
      />
    </SafeContainer>
  );
}
