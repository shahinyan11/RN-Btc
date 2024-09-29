import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  Platform,
  Pressable,
  View,
  TouchableOpacity,
  Animated,
  Clipboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';
import {StackScreenProps} from '@react-navigation/stack';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

import SafeContainer from '@components/containers/SafeContainer';
import Text from '@components/texts/Text';
import Wallet from '@components/Wallet';
import Row from '@components/containers/Row';
import IconMenu from '@components/icons/IconMenu';
import Link from '@components/buttons/Link';
import ItemHistory from '@components/items/ItemHistory';
import Icon from '@components/icons/Icon';

import {
  getDashboard,
  onSetDashboard,
  selectDashboard,
  selectLastNotification,
  selectLoading,
} from '@store/user';

import styles from './styles';
import {IHistory} from '@store/user/types';
import {globalStyles} from '@constants/styles';
import {getSocketsChannel, SOCKETS_EVENTS} from '@constants/values';

import {selectProfile, selectAuthToken} from '@store/auth';
import useWebSockets from '@hooks/useWebSockets';
import {IconReceive, IconSend, IconShake} from '@assets/icons';
import ActionBox from './ActionBox';

const IconAction = ({
  name,
  label,
  onPress,
  background,
}: {
  name: string;
  label: string;
  onPress: () => void;
  background: string;
}) => (
  <Pressable style={styles.iconActionContainerStyle} onPress={onPress}>
    <IconMenu
      name={name}
      iconContainerStyle={[
        styles.iconContainerStyle,
        {backgroundColor: background},
      ]}
    />
    <Text type="h5">{label}</Text>
  </Pressable>
);

export default function Dashboard({navigation}: StackScreenProps<any>) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();
  const dashboard = useSelector(selectDashboard);
  const {t} = useTranslation();

  const isDashboardLoading = useSelector(selectLoading);
  const lastNotification = useSelector(selectLastNotification);
  const token = useSelector(selectAuthToken);
  const {id} = useSelector(selectProfile);

  const darkGray = EStyleSheet.value('$darkGray');
  const [isLoading, setIsLoading] = useState(true);

  const onSetDashboardFromSockets = data => {
    dispatch(onSetDashboard(data));
  };

  const {disconnect} = useWebSockets({
    event: SOCKETS_EVENTS.DASHBOARD_UPDATED,
    channel: getSocketsChannel({id, key: 'dashboard'}),
    token,
    setData: onSetDashboardFromSockets,
  });

  const {
    currentUSDRate,
    name,
    username,
    balance,
    balanceUSD,
    transactions,
  } = dashboard;

  const navigateTo = (screen: string, params?: object) => {
    navigation.navigate(screen, params);
  };

  const onSend = () => {
    navigateTo('Transfer');
  };

  const onReceive = () => {
    navigateTo('TransferReceive');
  };

  const onShake = () => {
    navigateTo('TransferShake');
  };

  const onPressNotifications = () => {
    navigateTo('Notifications');
  };

  const onPressHistory = () => {
    navigateTo('History');
  };

  useEffect(() => {
    setIsLoading(isDashboardLoading);
  }, [isDashboardLoading, dispatch]);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(getDashboard());
    });

    return focusListener;
  }, [dispatch, navigation]);

  useEffect(() => {
    if (Platform.OS === 'ios' && dashboard.countUnreadNotifications) {
      PushNotificationIOS.setApplicationIconBadgeNumber(
        dashboard.countUnreadNotifications,
      );
    }
  }, [dashboard]);

  const renderTransaction = ({item}: {item: IHistory}) => (
    <ItemHistory {...item} onPress={onPressHistory} />
  );

  const NotificationBlock = () => {
    const isBlockActive = Boolean(lastNotification);

    return (
      <View>
        <Row justifyContent="space-between" style={styles.headerContainerStyle}>
          <Text type="h3">{t('notifications')}</Text>
          {isBlockActive && (
            <Link
              title={t('viewAll')}
              titleColor={darkGray}
              onPress={onPressNotifications}
            />
          )}
        </Row>
        {isBlockActive ? (
          <TouchableOpacity onPress={onPressNotifications}>
            <View style={styles.notificationContainerStyle}>
              <Row justifyContent="space-between">
                <Text type="h4" numberOfLines={1}>
                  {lastNotification.data.title}
                </Text>
                {!lastNotification.read && (
                  <View style={styles.unreadNotificationStyle} />
                )}
              </Row>
              <Text
                type="paragraph"
                numberOfLines={2}
                style={styles.notificationTextStyle}>
                {lastNotification.data.message}
              </Text>
            </View>
            <View style={styles.backgroundNotificationContainerStyle} />
          </TouchableOpacity>
        ) : (
          <View>
            <Text type="description">{t('emptyNotificationMessage')}</Text>
          </View>
        )}
      </View>
    );
  };

  const TransactionsBlock = () => {
    const isBlockActive = transactions?.length > 0;
    return (
      <View style={globalStyles.fullScale}>
        <Row justifyContent="space-between" style={styles.headerContainerStyle}>
          <Text type="h3">{t('transaction_history')}</Text>
          {isBlockActive && (
            <Link
              title={''}
              icon={{name: 'arrow-right'}}
              onPress={onPressHistory}
            />
          )}
        </Row>
        <View style={globalStyles.fullScale}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={transactions?.slice(0, 3)}
            renderItem={renderTransaction}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={globalStyles.listContainerStyle}
            ListEmptyComponent={() => (
              <View>
                <Text type="description">{t('emptyTransactionsMessage')}</Text>
              </View>
            )}
          />
        </View>
      </View>
    );
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start();
  };

  const startAnimation = () => {
    fadeIn();
    setTimeout(() => {
      fadeOut();
    }, 1000);
  };

  return (
    <>
      <Animated.View
        style={[
          styles.copyContainer,
          {
            opacity: fadeAnim,
          },
        ]}>
        <Text style={{}}>Copied</Text>
      </Animated.View>
      <SafeContainer
        loading={isLoading}
        containerStyle={styles.sfContainerStyle}>
        <Wallet
          name={name ?? t('notFound')}
          username={username}
          balance={balance}
          balanceUSD={balanceUSD}
          onCopyMessageShow={startAnimation}
        />
        <Row justifyContent={'space-between'}>
          <ActionBox
            onPress={onReceive}
            icon={<IconReceive />}
            text={t('receive')}
          />
          <ActionBox onPress={onSend} icon={<IconSend />} text={t('send')} />
          <ActionBox onPress={onShake} icon={<IconShake />} text={t('shake')} />
        </Row>

        <TransactionsBlock />
      </SafeContainer>
    </>
  );
}
