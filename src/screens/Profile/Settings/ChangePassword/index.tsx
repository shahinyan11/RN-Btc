import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import InputPassword from '@components/inputs/InputPassword';
import SafeContainer from '@components/containers/SafeContainer';
import Button from '@components/buttons/Button';
import Text from '@components/texts/Text';
import KeyboardListener from '@components/listeners/KeyboardListener';

import styles from './styles';
import {passwordsEquals, scaledSize} from '@utils';
import {onUpdatePassword} from '@store/user';

export default function ChangePassword({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const [isValid, setIsValid] = useState(false);

  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

  const onSuccess = () => {
    navigation.goBack();
  };

  const onSubmit = () => {
    dispatch(
      onUpdatePassword(
        {
          old_password: currentPassword,
          password: newPassword,
          password_confirmation: repeatedPassword,
        },
        onSuccess,
      ),
    );
  };

  const onEnterNewPassword = (value: string) => {
    setNewPassword(value.trim());
  };

  const onEnterRepeatPassword = (value: string) => {
    setRepeatedPassword(value.trim());
  };

  useEffect(() => {
    const isAllFieldFilled =
      Boolean(currentPassword) &&
      passwordsEquals(newPassword, repeatedPassword);

    setIsValid(isAllFieldFilled);
  }, [currentPassword, newPassword, repeatedPassword]);

  return (
    <SafeContainer>
      <>
        <KeyboardListener
          containerStyle={styles.safeContainerStyle}
          keyboardOffset={scaledSize(80)}>
          <InputPassword
            label={t('content.currentPassword')}
            placeholder={t('content.enterCurrentPassword')}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />

          <Text type="description" style={styles.hintStyle}>
            {t('content.changePasswordHint')}
          </Text>

          <InputPassword
            label={t('content.newPassword')}
            placeholder={t('content.createNewPassword')}
            value={newPassword}
            onChangeText={onEnterNewPassword}
            isValid={passwordsEquals(newPassword, repeatedPassword)}
          />
          <Text type="description" style={styles.passwordHintStyle}>
            {t('content.passwordRules')}
          </Text>
          <InputPassword
            label={t('content.repeatNewPassword')}
            placeholder={t('content.repeatNewPassword')}
            value={repeatedPassword}
            onChangeText={onEnterRepeatPassword}
            isValid={passwordsEquals(newPassword, repeatedPassword)}
          />
        </KeyboardListener>
      </>

      <Button
        disabled={!isValid}
        title={t('content.updatePassword')}
        onPress={onSubmit}
      />
    </SafeContainer>
  );
}
