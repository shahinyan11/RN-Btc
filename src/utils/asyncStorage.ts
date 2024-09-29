import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: any) => {
  try {
    let jsonValue = value;
    if (typeof value !== 'string') {
      jsonValue = JSON.stringify(value);
    }

    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log('Error save data', e);
  }
};

export const setAccessToken = async (value: string) => {
  try {
    await AsyncStorage.setItem('@access_token', value);
  } catch (e) {
    console.log('Error save data', e);
  }
};

export const getAccessToken = async (key: string) => {
  try {
    const token = await AsyncStorage.getItem(key);
    return token;
  } catch (e) {
    console.log('Error get data', e);
  }
};

export const getStoreLanguage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@language');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log('Error get data', e);
  }
};

export const getStoreData = async (
  key: string,
  defaultValue: null | any = null,
) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
  } catch (e) {
    console.log('Error get data', e);
  }
};

export const removeStoreData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('Error removing key from store');
  }
};
