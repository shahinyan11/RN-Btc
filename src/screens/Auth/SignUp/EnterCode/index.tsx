import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/texts/Text';
import Button from '@components/buttons/Button';
import ButtonResend from '@components/buttons/ButtonResend';

import styles from './styles';

import {onAddPhone, onSendCode} from '@store/auth';

import {EnterCodeProps} from '@navigation/config/types';

export default function EnterCode({route}: EnterCodeProps) {
  const {t} = useTranslation();
  const {phone} = route.params;
  const [code, setCode] = useState('');
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  const onPressSubmit = () => {
    dispatch(
      onAddPhone({
        code,
        phone,
      }),
    );
  };

  const onResend = () => {
    dispatch(onSendCode({phone: +phone}));
  };

  useEffect(() => {
    setIsValid(phone.length > 8);
  }, [phone]);

  const ref = useBlurOnFulfill({code, cellCount: 6});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });

  useEffect(() => {
    setIsValid(code.length === 6);
  }, [code]);

  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <Text type="h1">{t('content.confirmPhone')}</Text>
      <Text type="description" style={styles.subtitleStyle}>
        {t('content.codeSendTo', {phone: `+${phone}`})}
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

      <ButtonResend onPress={onResend} containerStyle={{marginBottom: 32}} />

      <Button
        disabled={!isValid}
        title={t('content.confirm')}
        onPress={onPressSubmit}
      />
    </SafeContainer>
  );
}
