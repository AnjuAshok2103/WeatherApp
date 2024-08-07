import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncKeyValue, LocalStorageProps} from '../types';

const LocalStorage = (): LocalStorageProps => {
  const saveString = async ({key, value}: AsyncKeyValue) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  };

  const save = async ({key, value}: AsyncKeyValue) => saveString({key, value});

  const removeString = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`remove AsyncStorage : ${key}`);
      return true;
    } catch (error) {
      console.log(`remove AsyncStorage error : ${error}`);
      return false;
    }
  };

  const getFromAsyncStorage = async (key: string) => {
    try {
      const itemString = await AsyncStorage.getItem(key);
      if (itemString) {
        return JSON.parse(itemString);
      }
    } catch (error) {
      console.log(`get from AsyncStorage error : ${error}`);
      return null;
    }
  };
  return {
    save,
    saveString,
    getFromAsyncStorage,
    removeString,
  };
};
export default LocalStorage;
