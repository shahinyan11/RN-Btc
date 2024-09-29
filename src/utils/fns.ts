import { format, formatDistanceToNow, fromUnixTime } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';

import { getI18n } from 'react-i18next';

const localesLanguage = {
  ru: ru,
  en: enUS,
};

export const formatTime = (
  timestamp = 1618598988,
  maskTime = 'dd MMMM yyyy HH:mm',
) => {
  const i18n = getI18n();
  const lang = localesLanguage[i18n.language];

  return format(fromUnixTime(timestamp), maskTime, { locale: lang });
};

export const formatTimeString = (date: string, maskTime = 'dd MMM yyyy') => {
  const i18n = getI18n();
  const lang = localesLanguage[i18n.language];
  return format(new Date(date), maskTime, { locale: lang });
};

export const formatTimeDistance = (time: Date) => {
  const i18n = getI18n();
  const lang = localesLanguage[i18n.language];
  return formatDistanceToNow(time, {
    addSuffix: true,
    locale: lang,
  });
};
