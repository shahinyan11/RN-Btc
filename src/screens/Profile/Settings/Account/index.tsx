import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import Avatar from '@components/avatars/Avatar';
import SafeContainer from '@components/containers/SafeContainer';
import Input from '@components/inputs/Input';
import Button from '@components/buttons/Button';
import KeyboardListener from '@components/listeners/KeyboardListener';
import ButtonLabel from '@components/buttons/ButtonLabel';

import styles from './styles';

import {onProfileUpdate, selectProfile} from '@store/auth';
import {validateUsername} from '@utils';

export default function Account({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const profile = useSelector(selectProfile);
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState(profile.avatar);
  const [name, setName] = useState(profile.name);
  const [username, setUsername] = useState(profile.username);
  const [about_yourself, setAboutYourself] = useState(profile.about_yourself);

  const [isValid, setValid] = useState(false);

  useEffect(() => {
    setValid(username.length > 8);
  }, [username]);

  const onSuccess = () => navigation.goBack();

  const onSubmit = () => {
    dispatch(
      onProfileUpdate(
        {
          name,
          ...validateUsername(username),
          about_yourself,
          avatar: profile.avatar !== avatar ? avatar : null,
        },
        onSuccess,
      ),
    );
  };

  const onPressEmail = () => {
    navigation.navigate('ChangeEmail');
  };

  const onPressPhone = () => {
    navigation.navigate('ChangePhone');
  };

  return (
    <SafeContainer>
      <KeyboardListener containerStyle={styles.safeContainerStyle}>
        <Avatar editable image={avatar} onPress={setAvatar} />

        <Input
          label={t('content.name')}
          placeholder={t('content.enterName')}
          value={name}
          onChangeText={setName}
        />

        <Input
          label={t('content.username')}
          placeholder={t('content.enterUsername')}
          value={username}
          onChangeText={setUsername}
          hint={t('content.hintUsername')}
        />

        <Input
          label={t('content.bio')}
          multiline
          placeholder={t('content.enterBio')}
          value={about_yourself}
          onChangeText={setAboutYourself}
        />

        <ButtonLabel
          label={t('content.email')}
          placeholder={t('content.enterEmail')}
          value={profile.email}
          onPress={onPressEmail}
        />

        <ButtonLabel
          label={t('content.phone')}
          placeholder={t('content.enterPhone')}
          value={profile.phone}
          onPress={onPressPhone}
        />
      </KeyboardListener>
      <Button
        disabled={!isValid}
        title={t('content.save')}
        onPress={onSubmit}
        containerStyle={styles.buttonContainerStyle}
      />
    </SafeContainer>
  );
}
