import AsyncStorage from '@react-native-async-storage/async-storage';

const getItem = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const setItem = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export {getItem, setItem};
