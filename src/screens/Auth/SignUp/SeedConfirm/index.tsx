import React, {useEffect, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import SafeScrollContainer from '@components/containers/SafeScrollContainer';
import Text from '@components/texts/Text';
import Row from '@components/containers/Row';
import Button from '@components/buttons/Button';
import ItemKeywordField from '@components/items/ItemKeywordField';
import CheckBox from '@components/checkboxes/CheckBox';
import PrivacyModal from '@components/modals/ModalPrivacy';

import styles from './styles';

import {onSignUpSeed} from '@store/auth';
import {globalStyles} from '@constants/styles';
import {SUSeedProps} from '@navigation/config/types';

const ItemKeyword = ({
  item,
  onPress,
}: {
  item: string;
  onPress: (value: string) => void;
}) => {
  const onPressKeyword = () => {
    onPress(item);
  };

  return (
    <TouchableOpacity style={styles.itemKeywordStyle} onPress={onPressKeyword}>
      <Text type="h5">{item}</Text>
    </TouchableOpacity>
  );
};

export default function SUSeed({route, navigation}: SUSeedProps) {
  const {t} = useTranslation();
  const {words}: {words: string[]} = route.params;

  const [systemWords, setSystemsWords] = useState([] as string[]);
  const [userWords, setUserWords] = useState(Array(12).fill(''));
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [isAgreeRules, setIsAgreeRules] = useState(false);
  const [isTermsShow, setTermsShow] = useState(false);

  const dispatch = useDispatch();

  const onSuccess = () => {
    navigation.navigate('SUSeedSecure');
  };

  const onSubmit = () => {
    let isEquals = true;

    for (let index = 0; index < 12; index++) {
      if (words[index] !== userWords[index]) {
        isEquals = false;
      }
    }

    if (isEquals) {
      dispatch(onSignUpSeed({seed_phrase: userWords}, onSuccess));
    }
  };

  const onChangeRulesRead = () => {
    setIsAgreeRules(!isAgreeRules);
  };

  const onPressTerms = () => {
    setTermsShow(!isTermsShow);
  };

  const onPressKeyword = (value: string) => {
    const newWords = userWords.concat();
    newWords[selectedIndex] = value;
    setUserWords(newWords);
    setSelectedIndex(selectedIndex + 1);
  };

  const onClear = (index: number) => () => {
    console.log(userWords[index]);
    if (selectedIndex >= 0 && index === selectedIndex) {
      const newWords = userWords.concat();
      newWords[selectedIndex] = '';
      setUserWords(newWords);
      setSelectedIndex(selectedIndex - 1);
    }

    if (userWords[index]) {
      setSelectedIndex(index);
      const newWords = userWords.concat();
      newWords[index] = '';
      setUserWords(newWords);
    }
  };

  const renderItemKeywordField = ({
    item,
    index,
  }: {
    item: string;
    index: number;
  }) => {
    return (
      <ItemKeywordField
        key={`${item}:${index}`}
        item={item}
        index={index}
        selectedIndex={selectedIndex}
        onSelectField={setSelectedIndex}
        onClear={onClear(index)}
      />
    );
  };

  useEffect(() => {
    const tempUserWords = words.concat().sort(() => Math.random() - 0.5);
    setSystemsWords(tempUserWords);
  }, [words]);

  useEffect(() => {
    const isValidArray = userWords.filter(item => item !== '').length === 12;

    setIsValid(isValidArray);
  }, [userWords]);

  return (
    <SafeScrollContainer containerStyle={styles.sfContainerStyle}>
      <View>
        <Text type="h1">{t('content.confirmAnonymousSignUp')}</Text>
        <Text type="description" style={styles.subtitleStyle}>
          {t('content.confirmAnonymousSignUpDescription')}
        </Text>

        <View style={styles.wordsContainerStyle}>
          <View style={globalStyles.fullScale}>
            {userWords
              .slice(0, 6)
              .map((item, index) => renderItemKeywordField({item, index}))}
          </View>
          <View style={globalStyles.fullScale}>
            {userWords
              .slice(6, 12)
              .map((item, index) =>
                renderItemKeywordField({item, index: index + 6}),
              )}
          </View>
        </View>

        {!isValid && (
          <View>
            <Text type="h5">{t('content.pressOnWord')}</Text>
            <Row style={styles.rowContainerStyle}>
              {systemWords.map((item, index) => (
                <ItemKeyword key={index} item={item} onPress={onPressKeyword} />
              ))}
            </Row>
          </View>
        )}
      </View>

      <View>
        {isValid && (
          <Row style={styles.rulesContainerStyle}>
            <CheckBox active={isAgreeRules} onPress={onChangeRulesRead} />

            <Text type="paragraph" style={styles.rulesStyles}>
              {t('content.anonymousPrivacyTermsText')}
              <Text
                type="paragraph"
                style={styles.linkTextStyle}
                onPress={onPressTerms}>
                {t('content.privacyTerms')}
              </Text>
            </Text>
          </Row>
        )}

        <Button
          disabled={!isValid || !isAgreeRules}
          title={t('content.verify')}
          onPress={onSubmit}
        />
      </View>

      <PrivacyModal isVisible={isTermsShow} onClose={onPressTerms} />
    </SafeScrollContainer>
  );
}
