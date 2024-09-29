import { LocaleConfig } from 'react-native-calendars';

const ru = {
  monthNames: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  monthNamesShort: [
    'Янв.',
    'Фев.',
    'Мар.',
    'Апр.',
    'Май',
    'Июн.',
    'Июл.',
    'Авг.',
    'Сент.',
    'Окт.',
    'Нояб.',
    'Дек.',
  ],
  dayNames: [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    "П'ятница",
    'Суббота',
    'Воскресенье',
  ],
  dayNamesShort: ['Вос.', 'Пон.', 'Вто.', 'Сре.', 'Чет.', 'Пят.', 'Суб.'],
  amDesignator: 'AM',
  pmDesignator: 'PM',
};

export const calendarLocales = {
  ...LocaleConfig.locales,
  ru,
};
