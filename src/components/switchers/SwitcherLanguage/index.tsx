import React, {useState} from 'react';
import {Modal, TouchableOpacity} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import Row from '@components/containers/Row';
import SafeContainer from '@components/containers/SafeContainer';
import Icon from '@components/icons/Icon';
import Text from '@components/texts/Text';

import {selectLanguage, selectLanguages, setAppLanguage} from '@store/app';
import {ILanguage} from '@store/app/types';

import styles from './styles';

export const SwitcherLanguage = () => {
  const languagesList = useSelector(selectLanguages);
  const language = useSelector(selectLanguage);
  const {i18n} = useTranslation();

  const dispatch = useDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const lightGreen = EStyleSheet.value('$lightGreen');

  const onPressLanguage = (value: ILanguage) => () => {
    i18n.changeLanguage(value.lng);
    dispatch(setAppLanguage(value));

    onChangeModalVisible();
  };

  const onChangeModalVisible = () => setIsModalVisible(!isModalVisible);

  return (
    <>
      <TouchableOpacity
        onPress={onChangeModalVisible}
        style={styles.buttonContainerStyle}>
        <Text type="h3" style={styles.languageTitleStyle}>
          {language?.lng}
        </Text>
      </TouchableOpacity>
      <SafeContainer containerStyle={styles.sfContainerStyle}>
        <Modal visible={isModalVisible}>
          <SafeContainer containerStyle={styles.containerStyle}>
            {languagesList.map((item: ILanguage) => {
              const isActive = language?.lng === item.lng;
              const {title, lng} = item;
              return (
                <TouchableOpacity
                  key={`${title}: ${lng}`}
                  onPress={onPressLanguage(item)}>
                  <Row
                    justifyContent="space-between"
                    style={styles.itemContainerStyle}>
                    <Text type={isActive ? 'label' : 'paragraph'}>{title}</Text>
                    {isActive && (
                      <Icon name="check" color={lightGreen} size={20} />
                    )}
                  </Row>
                </TouchableOpacity>
              );
            })}
          </SafeContainer>
        </Modal>
      </SafeContainer>
    </>
  );
};
