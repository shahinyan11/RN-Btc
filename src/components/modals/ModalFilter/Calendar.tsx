import React, {useCallback, useEffect, useState, memo} from 'react';
import {CalendarList, LocaleConfig} from 'react-native-calendars';
import {Dimensions} from 'react-native';
import {eachDayOfInterval, format} from 'date-fns';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

import Button from '@components/buttons/Button';

import {selectLanguage} from '@store/app';
import {scaledSize, calendarLocales} from '@utils';
import fonts from '@constants/fonts';

const {width} = Dimensions.get('window');

import styles from './styles';

LocaleConfig.locales = calendarLocales;

interface ICalendarShowProps {
  isCalendarShow: boolean;
  fromDate: string;
  toDate: string;
  selectFirstDate: boolean;
  isValid: boolean;
  onPressDay: (day: any) => void;
  onSave: () => void;
}

const CalendarView = ({
  isCalendarShow,
  fromDate,
  toDate,
  isValid,
  onPressDay,
  onSave,
  selectFirstDate,
}: ICalendarShowProps) => {
  const {t} = useTranslation();
  const [selectedInterval, setSelectedInterval] = useState({});
  const language = useSelector(selectLanguage);

  const mediumGreen = EStyleSheet.value('$mediumGreen');
  const lightGreen = EStyleSheet.value('$lightGreen');
  const darkGray = EStyleSheet.value('$darkGray');

  useEffect(() => {
    switch (language.lng) {
      case 'ru': {
        LocaleConfig.defaultLocale = 'ru';
        break;
      }
      default:
        LocaleConfig.defaultLocale = '';
    }
  }, [language]);

  useEffect(() => {
    if (isValid) {
      const daysInterval = eachDayOfInterval({
        start: new Date(fromDate),
        end: new Date(toDate),
      });

      const daysIntervalTmpObject = {};

      daysInterval.forEach((d, index) => {
        const day = format(d, 'yyyy-MM-dd');
        const isStartDay = index === 0;
        const isEndingDay = index === daysInterval.length - 1;

        Object.assign(daysIntervalTmpObject, {
          [day]: {
            startingDay: isStartDay,
            color:
              isEndingDay || isStartDay ? lightGreen : 'rgba(5, 219, 147, 0.2)',
            textColor: 'white',
            endingDay: isEndingDay,
          },
        });
      });

      setSelectedInterval(daysIntervalTmpObject);
    } else if (selectFirstDate && !toDate) {
      setSelectedInterval({
        [fromDate]: {
          color: lightGreen,
          textColor: 'white',
        },
      });
    } else {
      setSelectedInterval({});
    }
  }, [isValid, fromDate, toDate, selectFirstDate]);

  const calendarWidth = useCallback(() => {
    return width - scaledSize(48);
  }, [isCalendarShow]);

  return isCalendarShow ? (
    <>
      <CalendarList
        firstDay={1}
        horizontal
        key={language.lng}
        hideArrows={false}
        pagingEnabled={true}
        maxDate={new Date()}
        calendarWidth={calendarWidth()}
        style={styles.calendarContainerStyle}
        markingType="period"
        markedDates={selectedInterval}
        theme={{
          calendarBackground: mediumGreen,
          textSectionTitleColor: darkGray,
          selectedDayBackgroundColor: mediumGreen,
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#ffffff',
          dayTextColor: '#ffffff',
          textDisabledColor: darkGray,
          selectedDotColor: '#ffffff',
          arrowColor: '#ffffff',
          monthTextColor: 'white',
          textDayFontFamily: fonts.montRegular,
          textMonthFontFamily: fonts.montRegular,
          textDayHeaderFontFamily: fonts.montRegular,
          textDayFontWeight: '600',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '400',
          textDayFontSize: 15,
          textMonthFontSize: 15,
          textDayHeaderFontSize: 15,
        }}
        onDayPress={onPressDay}
      />
      <Button title={t('save')} onPress={onSave} />
    </>
  ) : null;
};

export default memo(CalendarView);
