import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import styles from './styles';
import {onRestoreAccount} from '@store/auth';
import {emailValid} from '@utils';
import {IconCheckedOutline} from '@assets/icons';
import InputEmail from '@components/inputs/InputEmail';
import Input from '@components/inputs/Input';
import Button from '@components/buttons/Button';

export default function RestoreForm() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = () => {
    dispatch(onRestoreAccount({email}, handleSuccess));
  };

  const handleSuccess = () => {
    setIsSent(true);
  };

  useEffect(() => {
    setIsValid(emailValid(email));
  }, [email]);

  return (
    <View>
      <Text style={styles.title}>{t('content.restoring_account')}</Text>

      {isSent && (
        <View style={{alignItems: 'center'}}>
          <View style={{marginTop: 70, marginBottom: 20}}>
            <IconCheckedOutline />
          </View>
          <Text style={styles.text}>
            {t('content.application_sent_wait_for_response')}
          </Text>
        </View>
      )}

      {!isSent && (
        <>
          <Text style={styles.desc}>{t('content.restoring_account_desc')}</Text>

          <InputEmail
            value={email}
            placeholder={t('content.email')}
            errorMessage={t('content.emailError')}
            onChangeText={setEmail}
            containerStyle={styles.inputContainer}
          />
          <Input
            value={text}
            onChangeText={setText}
            placeholder={t('content.start_typing')}
            multiline={true}
            inputContainerStyle={styles.textArea}
          />
          <Button
            disabled={!isValid}
            title={t('content.restore_account')}
            onPress={handleSubmit}
            buttonContainerStyle={styles.buttonContainer}
            disabledButtonContainerStyle={styles.disabledButtonContainer}
          />
        </>
      )}
    </View>
  );
}
