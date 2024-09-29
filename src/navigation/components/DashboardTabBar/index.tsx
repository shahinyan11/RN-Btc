import React, {memo} from 'react';
import {Pressable, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import Row from '@components/containers/Row';
import Text from '@components/texts/Text';
import InputSearch from '@components/inputs/InputSearch';
import Switcher from '@components/switchers/Switcher';

import styles from './styles';

interface DashboardTabBarProps {
  withWallet: boolean;
  searchInContacts: boolean;
  onChangeTab: (value: boolean) => void;
  onChangeSearchInContacts: (value: boolean) => void;
  searchQuery: string;
  onChangeSearchQuery: (query: string) => void;
}

const DashboardTabBar = ({
  withWallet = true,
  searchInContacts = false,
  onChangeTab,
  onChangeSearchInContacts,
  searchQuery,
  onChangeSearchQuery,
}: DashboardTabBarProps) => {
  const {t} = useTranslation();

  const navigation = useNavigation();

  const navigateToWithWallet = () => {
    onChangeTab(true);
  };

  const navigateToOtherWallet = () => {
    onChangeTab(false);
  };

  const onChangeSearchPlace = () => {
    onChangeSearchInContacts(!searchInContacts);
  };

  const onPressQrCode = () => {
    navigation.navigate('QrReader');
  };

  return (
    <View>
      <Row justifyContent="space-between" style={styles.containerStyle}>
        <Pressable
          style={
            withWallet
              ? styles.activeTabContainerStyle
              : styles.tabContainerStyle
          }
          onPress={navigateToWithWallet}>
          <Text type="h5">{t('content.withWallet')}</Text>
        </Pressable>
        <Pressable
          style={
            !withWallet
              ? styles.activeTabContainerStyle
              : styles.tabContainerStyle
          }
          onPress={navigateToOtherWallet}>
          <Text type="h5">{t('content.otherWallet')}</Text>
        </Pressable>
      </Row>
      {withWallet && (
        <View>
          <InputSearch
            value={searchQuery}
            onChangeText={onChangeSearchQuery}
            placeholder={t('content.usernameOrWallet')}
            showFilterIcon={true}
            filterIcon="qrcode"
            onPressFilter={onPressQrCode}
            containerStyle={styles.searchInputContainerStyle}
          />
          <Row justifyContent="space-between">
            <Text type="h5">{t('content.searchInContacts')}</Text>
            <Switcher active={searchInContacts} onPress={onChangeSearchPlace} />
          </Row>
        </View>
      )}
    </View>
  );
};

export default memo(DashboardTabBar);
