import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useFocusEffect} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';

import SafeContainer from '@components/containers/SafeContainer';
import ItemHistory from '@components/items/ItemHistory';
import Text from '@components/texts/Text';

import ModalHistory from '@components/modals/ModalHistory';
import ModalFilter from '@components/modals/ModalFilter';
import LetterGroup from '@components/items/LetterGroup';
import {EmptyList} from '@components/items/EmptyList';

import {
  getHistory,
  onSearchHistory,
  onSetTransactions,
  selectGroupedHistory,
  selectLoading,
} from '@store/user';
import {selectAuthToken, selectProfile} from '@store/auth';
import {IHistory} from '@store/user/types';

import {globalStyles} from '@constants/styles';
import {getSocketsChannel, SOCKETS_EVENTS} from '@constants/values';

import useWebSockets from '@hooks/useWebSockets';

import styles from './styles';
import {showModal} from '@store/modal';
import Row from '@components/containers/Row';
import getCurrentMonth from '../../helpers/getCurrentMonth';
import {TRANSACTION_TYPES} from '@constants/index';

const itemsPerPage = 10;

/**
 * History screen
 */
function History() {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  const history = useSelector(selectGroupedHistory);

  const token = useSelector(selectAuthToken);
  const {id} = useSelector(selectProfile);
  const [selectedHistory, setSelectedHistory] = useState({
    pair: {
      avatar: null,
    },
    utc_timestamp: new Date().getTime(),
  } as IHistory);
  const [isHistoryModalVisible, setHistoryModalVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const isLoading = useSelector(selectLoading);

  const onSetTransactionsFromSockets = data => {
    dispatch(onSetTransactions(data));
  };

  const {disconnect} = useWebSockets({
    event: SOCKETS_EVENTS.TRANSACTIONS_UPDATE,
    channel: getSocketsChannel({id, key: 'transactions'}),
    token,
    setData: onSetTransactionsFromSockets,
  });

  /**
   * Clear query state if it does not empty when opening screen
   */
  useFocusEffect(
    useCallback(() => {
      setQuery('');
    }, []),
  );

  const onPressFilter = useCallback(() => {
    setIsFilterVisible(!isFilterVisible);
  }, [isFilterVisible]);

  const onChangeHistoryModalVisible = useCallback(
    () => setHistoryModalVisible(!isHistoryModalVisible),
    [isHistoryModalVisible],
  );

  const onRefresh = () => {
    setPage(1);
    setQuery('');
    setFromDate('');
    setToDate('');
    dispatch(getHistory({type: selectedType}));
  };

  const onLoadMore = () => {
    const itemLength = history.map(item => item.data).flat().length;

    if (itemLength >= page * itemsPerPage) {
      if (fromDate && toDate) {
        dispatch(
          getHistory({
            loadMore: true,
            date_from: fromDate,
            date_to: toDate,
            type: selectedType,
          }),
        );
        setQuery('');
        return;
      }
      if (query && query.length > 2) {
        dispatch(onSearchHistory({search: query, page: page + 1}));
        setPage(page + 1);
        return;
      }
      dispatch(getHistory({loadMore: true, type: selectedType}));
    }
  };

  const onPressItem = useCallback(sHistory => {
    setSelectedHistory(sHistory);
    setHistoryModalVisible(true);
  }, []);

  const renderItem = ({item}: {item: {title: string; data: IHistory[]}}) => {
    return (
      <LetterGroup<IHistory>
        {...item}
        onPress={onPressItem}
        MainComponent={ItemHistory}
      />
    );
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (query && query.length > 2) {
        dispatch(onSearchHistory({search: query, page: 1}));
        setPage(1);
      } else {
        dispatch(getHistory({type: selectedType}));
      }
    }, 500);
    return (): void => {
      clearTimeout(debounce);
    };
  }, [query, dispatch, i18n.language, selectedType]);

  const openCalendar = () => {
    dispatch(showModal({modalType: 'CALENDAR'}));
  };

  const onChangeText = (value: string) => {
    if (!value) {
      setPage(1);
      setToDate('');
      setFromDate('');
    }
    setQuery(value);
  };

  return (
    <SafeContainer>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text type="h2">{t('content.transaction_history')}</Text>
        </View>

        <Row>
          <Text type="h1">{t('content.transactions_for')}&nbsp;</Text>
          <Pressable onPress={openCalendar}>
            <Text type="h1" style={styles.textBlue}>
              {getCurrentMonth()}
            </Text>
          </Pressable>
        </Row>
      </View>

      <ScrollView
        style={{flexGrow: 0}}
        contentContainerStyle={styles.scrollContainer}
        horizontal={true}>
        <Pressable
          onPress={() => setSelectedType('')}
          style={styles[!selectedType ? 'activeFilterItem' : 'filterItem']}>
          <Text type={'h4'}>{t('content.all')}</Text>
        </Pressable>
        {Object.keys(TRANSACTION_TYPES).map(type => (
          <Pressable
            key={type}
            onPress={() => setSelectedType(type)}
            style={
              styles[selectedType === type ? 'activeFilterItem' : 'filterItem']
            }>
            {/*<Text type={'h4'}>{TRANSACTION_TYPES[type].label}</Text>*/}
            <Text type={'h4'}>{t(TRANSACTION_TYPES[type].label)}</Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.bodyContainerStyle}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={history}
          renderItem={renderItem}
          ListEmptyComponent={query.length ? EmptyList : null}
          keyExtractor={item => item.title}
          refreshing
          refreshControl={
            <RefreshControl
              tintColor={EStyleSheet.value('$lightGreen')}
              refreshing={isLoading}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={globalStyles.listContainerStyle}
          onEndReachedThreshold={0}
          onEndReached={onLoadMore}
        />
      </View>

      <ModalHistory
        isVisible={isHistoryModalVisible}
        item={selectedHistory}
        onClose={onChangeHistoryModalVisible}
      />
      <ModalFilter
        fromDate={fromDate}
        toDate={toDate}
        setFromDate={setFromDate}
        setToDate={setToDate}
        isVisible={isFilterVisible}
        onClose={onPressFilter}
      />
    </SafeContainer>
  );
}

export default History;
