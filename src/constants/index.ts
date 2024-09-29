import * as RNLocalize from 'react-native-localize';

export const SYSTEM_LANGUAGE = RNLocalize.getLocales()[0].languageCode;

export const EXCHANGE_TYPES = {
  card: {
    label: 'input.label_card_number',
    placeholder: '0000   0000   0000   0000',
    mask: '9999   9999   9999   9999',
  },

  phone: {
    label: 'common.phone_number',
    placeholder: '+7   000   000   00   00',
    mask: '+9   999   999   99   99',
  },
  email: {
    label: 'Электронная почта',
    placeholder: 'quan2um@gmail.com',
    splitArr: [],
    gap: 0,
  },
};

export const TRANSACTION_TYPES: {[key: string]: any} = {
  send: {id: 1, label: 'content.sent'},
  receive: {id: 2, label: 'content.received'},
  // award: {id: 3, label: i18next.t('content.awards')},
};
