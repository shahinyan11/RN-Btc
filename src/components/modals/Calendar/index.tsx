import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import {CalendarList} from 'react-native-calendars';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import {hideModal} from '@store/modal';
import Text from '@components/texts/Text';
import st from './styles';

export default function Calendar() {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [selectedDates, setSelectedDates] = useState([]);
  const [startDate, setStartDate] = useState(null);

  const handleDayPress = day => {
    setStartDate(day.dateString);
    setSelectedDates([day.dateString]);
  };

  const handleDayLongPress = day => {
    if (startDate) {
      const current = new Date(startDate);
      const end = new Date(day.dateString);
      const selected = [];
      while (current <= end) {
        selected.push(current.toISOString().split('T')[0]);
        current.setDate(current.getDate() + 1);
      }
      setSelectedDates(selected);
    } else {
      setStartDate(day.dateString);
    }
  };

  const closeModal = () => dispatch(hideModal());

  const markedDates = {};
  selectedDates.forEach(date => {
    markedDates[date] = {selected: true};
  });

  return (
    <View style={st.container}>
      <View style={st.header}>
        <Pressable onPress={closeModal}>
          <Text type={'h4'} style={st.blueText}>
            {t('close')}
          </Text>
        </Pressable>

        <Text type={'h4'}>{t('choose_period')}</Text>
        <Pressable onPress={closeModal}>
          <Text type={'h4'} style={st.blueText}>
            {t('ready')}
          </Text>
        </Pressable>
      </View>
      <CalendarList
        theme={theme}
        onDayPress={handleDayPress}
        onDayLongPress={handleDayLongPress}
        markedDates={markedDates}
        pastScrollRange={24}
        futureScrollRange={12}
        scrollEnabled={true}
        showScrollIndicator={true}
        // onVisibleMonthsChange={months => {
        //   console.log('now these months are visible', months);
        // }}
      />
    </View>
  );
}

const theme = {
  backgroundColor: '#18182F',
  calendarBackground: '#18182F',
  monthTextColor: '#fff',
  dayTextColor: '#fff',
  textSectionTitleColor: 'rgba(255, 255, 255, 0.3)',
};
