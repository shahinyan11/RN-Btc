import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {StackScreenProps} from '@react-navigation/stack';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/texts/Text';
import Button from '@components/buttons/Button';
import Link from '@components/buttons/Link';
import CheckBox from '@components/checkboxes/CheckBox';
import ItemRow from '@components/items/ItemSeedRow';
import KeyboardListener from '@components/listeners/KeyboardListener';

import styles from './styles';

import {getSeedKeywords} from '@store/auth';

export default function SUSeed({navigation}: StackScreenProps<any>) {
  const {t} = useTranslation();
  const [words, setWords] = useState([] as string[]);
  const [loading, setLoading] = useState(true);
  const [isSeedSave, setIsSeedSave] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = () => {
    navigation.navigate('SUSeedConfirm', {
      words,
    });
  };

  const fetchSeedCode = useCallback(() => {
    if (!isSeedSave) {
      dispatch(
        getSeedKeywords({onSuccess: setWords, onChangeLoader: setLoading}),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onChangeSeedSave = () => {
    setIsSeedSave(!isSeedSave);
  };

  useEffect(() => {
    fetchSeedCode();
  }, [fetchSeedCode]);

  return (
    <SafeContainer loading={loading}>
      <KeyboardListener containerStyle={styles.sfContainerStyle}>
        <Text type="h1">{t('content.anonymousSignUp')}</Text>
        <Text type="description" style={styles.subtitleStyle}>
          {t('content.anonymousLoginDescription')}
        </Text>
        <View style={styles.wordsContainerStyle}>
          {Array(6)
            .fill('')
            .map((item, index) => (
              <ItemRow
                disabled={false}
                key={index}
                index={index}
                words={words}
                setWords={setWords}
                withoutClear={true}
              />
            ))}

          {!isSeedSave && (
            <Link
              icon={{name: 'reload'}}
              titleColor="white"
              title={t('content.updateSeed')}
              containerStyle={styles.linkContainerStyle}
              onPress={fetchSeedCode}
            />
          )}
        </View>

        <CheckBox
          active={isSeedSave}
          label={t('content.written')}
          onPress={onChangeSeedSave}
          containerStyle={styles.checkBoxContainerStyle}
        />

        <Button
          disabled={!isSeedSave}
          title={t('content.continueSeed')}
          onPress={onSubmit}
        />
      </KeyboardListener>
    </SafeContainer>
  );
}
