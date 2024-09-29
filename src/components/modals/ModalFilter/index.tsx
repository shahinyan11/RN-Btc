import React, {useState, useEffect, useCallback} from 'react';
import {useTranslation} from 'react-i18next';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';

import CModal from '@components/modals/CModal';
import Row from '@components/containers/Row';
import Button from '@components/buttons/Button';
import Text from '@components/texts/Text';
import Icon from '@components/icons/Icon';
import ButtonLabel from '@components/buttons/ButtonLabel';
import Link from '@components/buttons/Link';
import CalendarView from './Calendar';

import styles from './styles';

import {getHistory} from '@store/user';
import {formatTimeString} from '@utils';

const ModalFilter = ({
  isVisible,
  onClose,
  fromDate,
  toDate,
  setFromDate,
  setToDate,
}: {
  isVisible: boolean;
  onClose: () => void;
  fromDate: string | undefined;
  toDate: string | undefined;
  setFromDate: (value: string) => void;
  setToDate: (value: string) => void;
}) => {
  const {t} = useTranslation();
  const [isCalendarShow, setCalendarShow] = useState(false);
  const [isValid, setValid] = useState(false);
  const [selectFirstDate, setSelectFirstDate] = useState(true);

  const dispatch = useDispatch();

  const onSubmit = () => {
    dispatch(
      getHistory({loadMore: false, date_from: fromDate, date_to: toDate}),
    );
    onClose();
  };

  const onCloseFilterWindow = () => {
    setCalendarShow(false);
    onClose();
  };

  const onClear = () => {
    setFromDate();
    setToDate();
    setValid(false);
    dispatch(getHistory());
  };

  const onChangeCalendarShow = useCallback(() => {
    setCalendarShow(!isCalendarShow);
  }, [isCalendarShow]);

  const onShowCalendarFFDate = () => {
    setCalendarShow(true);
    setSelectFirstDate(true);
  };

  const onShowCalendarFSDate = () => {
    if (fromDate) {
      setCalendarShow(true);
      setSelectFirstDate(false);
    }
  };

  const onPressDay = useCallback(
    (date: any) => {
      const currentDate = new Date(date.dateString);
      //selectedDate <= currentDate
      if (currentDate <= new Date()) {
        if (selectFirstDate) {
          if (toDate && currentDate < new Date(toDate)) {
            setFromDate(date.dateString);
          } else if (!toDate) {
            setFromDate(date.dateString);
          }
        } else {
          if (currentDate > new Date(fromDate)) {
            setToDate(date.dateString);
          }
        }
      }
    },
    [selectFirstDate],
  );

  useEffect(() => {
    setValid(Boolean(fromDate) && Boolean(toDate));
  }, [fromDate, toDate]);

  const goldLight = EStyleSheet.value('$goldLight');
  const darkGray = EStyleSheet.value('$darkGray');

  return (
    <CModal
      isVisible={isVisible}
      onClose={onCloseFilterWindow}
      modalWindowStyle={styles.modalWindowStyle}>
      <Row justifyContent={'space-between'}>
        {isCalendarShow && (
          <Icon
            disabled={false}
            name="arrow-left"
            size={24}
            containerStyle={styles.iconBackContainerStyle}
            onPress={onChangeCalendarShow}
          />
        )}
        <Text type="h3" style={styles.headerTitleStyle}>
          {isCalendarShow
            ? selectFirstDate
              ? t('fromFilter')
              : t('toFilter')
            : t('filter')}
        </Text>
        {isCalendarShow && <View style={styles.rightContainerStyle} />}
      </Row>
      {!isCalendarShow && (
        <>
          <ButtonLabel
            icon={{
              name: 'calendar',
              size: 24,
              color: goldLight,
            }}
            label={t('fromFilter')}
            placeholder={t('enterDate')}
            value={fromDate && formatTimeString(fromDate)}
            onPress={onShowCalendarFFDate}
          />
          <ButtonLabel
            icon={{
              name: 'calendar',
              size: 24,
              color: fromDate ? goldLight : darkGray,
            }}
            label={t('toFilter')}
            placeholder={t('enterDate')}
            value={toDate && formatTimeString(toDate)}
            onPress={onShowCalendarFSDate}
          />

          <View style={styles.bottomContainerStyle}>
            <Button
              disabled={!isValid}
              title={t('filter')}
              onPress={onSubmit}
            />
            {isValid && (
              <Link
                title={t('clearFilter')}
                onPress={onClear}
                containerStyle={styles.btnFilterContainerStyle}
              />
            )}
          </View>
        </>
      )}

      <CalendarView
        isCalendarShow={isCalendarShow}
        fromDate={fromDate}
        toDate={toDate}
        selectFirstDate={selectFirstDate}
        isValid={isValid}
        onPressDay={onPressDay}
        onSave={onChangeCalendarShow}
      />
    </CModal>
  );
};

export default React.memo(ModalFilter);
