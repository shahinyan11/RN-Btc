import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/texts/Text';
import InputKeyword from '@components/inputs/InputKeywoard';
import Row from '@components/containers/Row';
import Button from '@components/buttons/Button';
import KeyboardListener from '@components/listeners/KeyboardListener';

import styles from './styles';

import {onLoginSeed} from '@store/auth';

interface IRowProps {
  index: number;
  words: string[];
  setWords: (value: string[]) => void;
}

const ItemRow = ({index, words, setWords}: IRowProps) => {
  const onChangeFirstText = (value: string) => {
    try {
      const currentIndex = index;
      const tempWords = words.concat();
      tempWords[currentIndex] = value;

      setWords(tempWords);
    } catch (e) {
      console.log('Error enter second value', e);
    }
  };

  const onChangeSecondText = (value: string) => {
    try {
      const currentIndex = index + 6;

      const tempWords = words.concat();
      tempWords[currentIndex] = value;

      setWords(tempWords);
    } catch (e) {
      console.log('Error enter second value', e);
    }
  };

  const onClearFirst = () => onChangeFirstText('');

  const onClearSecond = () => onChangeSecondText('');

  return (
    <Row key={index} style={styles.rowContainerStyle}>
      <InputKeyword
        editable={true}
        index={index + 1}
        value={words[index]}
        containerStyle={styles.leftItemContainerStyle}
        onChangeText={onChangeFirstText}
        onClear={onClearFirst}
      />
      <InputKeyword
        editable={true}
        index={index + 7}
        value={words[index + 6]}
        containerStyle={styles.rightItemContainerStyle}
        onChangeText={onChangeSecondText}
        onClear={onClearSecond}
      />
    </Row>
  );
};

export default function SISeed() {
  const {t} = useTranslation();
  const [words, setWords] = useState([] as string[]);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsValid(words.length === 12);
  }, [words]);

  const onSubmit = () => {
    dispatch(onLoginSeed({seed_phrase: words}));
  };

  return (
    <SafeContainer containerStyle={styles.sfContainerStyle}>
      <KeyboardListener keyboardOffset={-50} behavior="position">
        <Text type="h1">{t('content.anonymousLogin')}</Text>
        <Text type="description" style={styles.subtitleStyle}>
          {t('content.anonymousLoginDescription')}
        </Text>
        <View style={styles.wordsContainerStyle}>
          {Array(6)
            .fill('')
            .map((item, index) => (
              <ItemRow
                key={index}
                index={index}
                words={words}
                setWords={setWords}
              />
            ))}
        </View>
        <Button
          disabled={!isValid}
          title={t('content.logIn')}
          onPress={onSubmit}
        />
      </KeyboardListener>
    </SafeContainer>
  );
}
