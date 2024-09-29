import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import AsyncStorageBackend from 'i18next-async-storage-backend';
import ChainedBackend from 'i18next-chained-backend';
import HttpBackend from 'i18next-http-backend';
import Config from 'react-native-config';
import {SYSTEM_LANGUAGE} from '@constants/index';
import {getStoreLanguage} from '@utils/asyncStorage';

const languageDetector = {
  init: Function.prototype,
  type: 'languageDetector',
  async: true,
  detect: async (callback: any) => {
    const storedLanguage = await getStoreLanguage();
    callback(storedLanguage.lng || SYSTEM_LANGUAGE);
  },
  cacheUserLanguage: () => {},
};

i18n
  //@ts-ignore
  .use(languageDetector)
  .use(ChainedBackend)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    backend: {
      backends: [AsyncStorageBackend, HttpBackend],
      backendOptions: [
        {
          expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
        },
        {
          loadPath: `${Config.API_DOMAIN}/translates/{{lng}}`,
          allowMultiLoading: false,
          crossDomain: false,
        },
      ],
    },

    debug: false,
    nsSeparator: '__',
    returnObjects: false,
    // fallbackLng: ['en'],
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
