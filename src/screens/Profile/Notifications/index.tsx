import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {StackScreenProps} from '@react-navigation/stack';
import EStyleSheet from 'react-native-extended-stylesheet';

import SafeContainer from '@components/containers/SafeContainer';
import ItemNotification from '@components/items/ItemNotification';
import Divider from '@components/Divider';
import ModalNotification from '@components/modals/ModalNotification';
import {EmptyList} from '@components/items/EmptyList';
import Counter from '@components/containers/Counter';
import Row from '@components/containers/Row';

import {
  getNotifications,
  onReadNotification,
  selectGroupedNotifications,
  selectLoading,
  selectUnreadNotifications,
} from '@store/user';

import styles from './styles';
import {INotification} from '@store/user/types';
import {globalStyles} from '@constants/styles';

interface ILetterGroupProps {
  title: string;
  data: INotification[];
  onPressActionItem: (data: any) => void;
}

const LetterGroup = React.memo(
  ({title, data, onPressActionItem}: ILetterGroupProps) => {
    return (
      <>
        <Text style={styles.textStyle}>{title}</Text>

        {data.map((n, index) => (
          <View key={index.toString()}>
            <ItemNotification {...n} onPress={onPressActionItem} />
            {index !== data.length - 1 && (
              <Divider lineHeight={8} style={styles.dividerStyle} />
            )}
          </View>
        ))}
      </>
    );
  },
);

function Notifications({navigation}: StackScreenProps<any>) {
  const dispatch = useDispatch();
  const notifications = useSelector(selectGroupedNotifications);
  const isLoading = useSelector(selectLoading);
  const unreadNotifications = useSelector(selectUnreadNotifications);
  const {t} = useTranslation();

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const lightGreen = EStyleSheet.value('$lightGreen');

  const onChangeModalVisible = useCallback(() => {
    setModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const onReadAll = useCallback(() => {
    dispatch(onReadNotification());
  }, [dispatch]);

  const onPressActionItem = useCallback((data: INotification) => {
    setSelectedItem(data.id);
    setModalVisible(true);
  }, []);

  const onRefresh = useCallback(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  const onLoadMore = () => {
    dispatch(getNotifications(true));
  };

  const ButtonRight = useCallback(
    () => (
      <TouchableOpacity style={styles.buttonRight} onPress={onReadAll}>
        <Text style={styles.readAll}>{t('content.readAll')}</Text>
      </TouchableOpacity>
    ),
    [t, onReadAll],
  );

  const HeaderTitle = useCallback(
    () => (
      <Row justifyContent={'flex-start'}>
        <Text style={styles.titleStyle}>{t('content.notifications')}</Text>
        <Counter
          counter={unreadNotifications}
          containerStyle={styles.notifContainerStyle}
          colors={[
            EStyleSheet.value('$lightGreen'),
            EStyleSheet.value('$lightGreen'),
          ]}
        />
      </Row>
    ),
    [t, unreadNotifications],
  );

  const renderNotification = ({
    item,
  }: {
    item: {title: string; data: INotification[]};
  }) => (
    <LetterGroup
      title={item.title}
      data={item.data}
      onPressActionItem={onPressActionItem}
    />
  );

  useEffect(() => {
    navigation.setOptions({
      headerRight: ButtonRight,
      headerTitle: HeaderTitle,
    });
  }, [navigation, unreadNotifications, HeaderTitle, ButtonRight]);

  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      dispatch(getNotifications());
    });

    return focusListener;
  }, [dispatch, navigation]);

  return (
    <SafeContainer>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshing
        refreshControl={
          <RefreshControl
            tintColor={lightGreen}
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
        data={notifications}
        renderItem={renderNotification}
        ListEmptyComponent={EmptyList}
        keyExtractor={item => item.title}
        contentContainerStyle={globalStyles.listContainerStyle}
        onEndReachedThreshold={0.1}
        onEndReached={onLoadMore}
      />

      <ModalNotification
        itemId={selectedItem}
        isVisible={isModalVisible}
        onClose={onChangeModalVisible}
      />
    </SafeContainer>
  );
}

export default Notifications;
