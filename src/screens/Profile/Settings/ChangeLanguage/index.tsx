import React, {useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Row from '@components/containers/Row';
import SafeContainer from '@components/containers/SafeContainer';
import Icon from '@components/icons/Icon';
import Text from '@components/texts/Text';

import {
  getLanguages,
  selectLanguage,
  selectLanguages,
  setAppLanguage,
} from '@store/app';
import {ILanguage} from '@store/app/types';

import styles from './styles';
import {onUpdateLanguage} from '@store/auth';

export default function ChangeLanguage() {
  const language = useSelector(selectLanguage);
  const languagesList = useSelector(selectLanguages);
  const dispatch = useDispatch();
  const {i18n} = useTranslation();

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const onPressLanguage = (value: ILanguage) => () => {
    i18n.changeLanguage(value.lng);
    dispatch(onUpdateLanguage(value.lng));
    dispatch(setAppLanguage(value));
  };

  const lightGreen = EStyleSheet.value('$lightGreen');

  return (
    <SafeContainer>
      {languagesList.map((item: ILanguage) => {
        const isActive = language.lng === item.lng;
        const {title, lng} = item;
        return (
          <TouchableOpacity
            key={`${title}: ${lng}`}
            onPress={onPressLanguage(item)}>
            <Row
              justifyContent="space-between"
              style={styles.itemContainerStyle}>
              <Text type={isActive ? 'label' : 'paragraph'}>{title}</Text>
              {isActive && <Icon name="check" color={lightGreen} size={20} />}
            </Row>
          </TouchableOpacity>
        );
      })}
    </SafeContainer>
  );
}
