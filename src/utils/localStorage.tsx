import AsyncStorage from '@react-native-async-storage/async-storage';
import orderByName from './orderPlayers';

const getItem = async (key: string) => {
  try {
    // const jsonValue = await AsyncStorage.getItem(key);
    // return jsonValue != null ? JSON.parse(jsonValue) : null;
    return orderByName([
      {
        id: '2f045cf8-9b90-4da9-b09e-2988d1e4cf2e',
        name: 'Italo',
        playerSkill: 7,
      },
      {
        id: '74646f8a-eae2-41c4-a670-cf1f542efebf',
        name: 'Mirella',
        playerSkill: 5,
      },
      {
        id: 'b3d0c7a1-5a2e-4c92-bf7e-4c2eb1d67e12',
        name: 'Eduardo',
        playerSkill: 7,
      },
      {
        id: 'e1f47b9a-17ab-4b5a-a3f5-927f2e89e4c9',
        name: 'Bernard',
        playerSkill: 7,
      },
      {
        id: '9d42a667-8071-4b96-b02f-531b7f88a59f',
        name: 'Breno Lopes',
        playerSkill: 7,
      },
      {
        id: 'a52e6d8f-5e6b-4932-b2fb-1d07a7c643a0',
        name: 'Guilherme',
        playerSkill: 7,
      },
      {
        id: 'c438e5f9-8bfa-4c8b-9d27-d89db8461b9e',
        name: 'Breno Soares',
        playerSkill: 7,
      },
      {
        id: 'd3f4e789-6a2b-4c8d-bc5f-e3b24c3b5f4d',
        name: 'Amanda',
        playerSkill: 4,
      },
      {
        id: 'e78c5a9f-94b6-4c1f-967a-1b67e3d8f2a7',
        name: 'Paloma',
        playerSkill: 4,
      },
      {
        id: 'f16e7b42-98a2-4b0a-b87c-5c4f2d3e6b1a',
        name: 'Maria',
        playerSkill: 3,
      },
      {
        id: '0b6d3e94-6f42-4c3a-92d8-b1e7a2f5c9d0',
        name: 'Jack',
        playerSkill: 3,
      },
      {
        id: '1a8c9d5f-3b6e-4c2f-98d7-2e4b1f7a6c0d',
        name: 'Arthur',
        playerSkill: 6,
      },
      {
        id: '2e7f3d5a-9c8b-4a6d-b71f-6c2f5e4a98d0',
        name: 'Rodrigo',
        playerSkill: 7,
      },
      {
        id: '3d5a8c9b-6e7f-4a2d-b1f0-2e4c98d5a7b0',
        name: 'Giovana',
        playerSkill: 5,
      },
      {
        id: '4a6d7f3e-9b8c-4c2a-b5d0-1f2e98d7a6b0',
        name: 'Milena',
        playerSkill: 5,
      },
    ]);
  } catch (error) {
    console.log(error);
    return [];
  }
};

const setItem = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export {getItem, setItem};
