import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';
import {View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import SafeContainer from '@components/containers/SafeContainer';
import ButtonResend from '@components/buttons/ButtonResend';
import Button from '@components/buttons/Button';
import Text from '@components/texts/Text';

import {onChangeEmail, onSendChangeEmailCode} from '@store/user';

import {getProfile, selectProfile} from '@store/auth';

import styles from './styles';
import Api from '@api';

export default function ChangeEmailReset({
  navigation,
  route,
}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const {phone} = useSelector(selectProfile);
  const {email} = route?.params;
  const [code, setCode] = useState('');

  const dispatch = useDispatch();

  const onSuccess = () => {
    dispatch(getProfile());
    navigation.goBack();
  };

  const onResendCode = () => {
    dispatch(onSendChangeEmailCode());
  };

  const onSubmit = async () => {
    try {
      await Api.post('/check_code/email', {code});

      dispatch(
        onChangeEmail(
          {
            email,
            code,
          },
          onSuccess,
        ),
      );
    } catch (e) {}
  };

  const ref = useBlurOnFulfill({code, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });

  return (
    <SafeContainer>
      <Text type="description" style={styles.hintStyle}>
        {t('changeEmailCodeHint', {phone: `+${phone}`})}
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
        title={t('continue')}
        onPress={onSubmit}
        buttonContainerStyle={styles.btnContainerStyle}
      />

      <ButtonResend onPress={onResendCode} />
    </SafeContainer>
  );
}
