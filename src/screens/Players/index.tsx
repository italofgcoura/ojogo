import React, {useEffect, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import PageBackground from '../../components/PageBackground';
import PageTitle from '../../components/PageTitle';
import {Colors, CustomButton, CustomInput} from '../../designSystem';
import {TrashCan} from '../../icons';
import {getItem} from '../../utils/localStorage';
import styles from './styles';
const Players = () => {
  // const {drawnPlayers} = useSelector((rootReducer: tRootState) => rootReducer.player);

  useEffect(() => {
    getStoredPlayers();
  }, []);

  const [saved, setSaved] = useState<{name: string; id: string}[]>([]);
  const [newPlayer, setNewPlayer] = useState('');
  const onSaveNewPlayer = async () => {
    try {
      const stored = await getStoredPlayers();
      if (stored) {
        stored.push({name: newPlayer, id: uuidv4()});
        const jsonValue = JSON.stringify(stored);
        await AsyncStorage.setItem('players', jsonValue);
        setNewPlayer('');
        getStoredPlayers();
        return;
      }
      const jsonValue = JSON.stringify([{name: newPlayer, id: uuidv4()}]);
      await AsyncStorage.setItem('players', jsonValue);
      getStoredPlayers();
      setNewPlayer('');
    } catch (e) {
      console.log('e', e);
      // saving error
    }
  };

  const getStoredPlayers = async () => {
    const stored = await getItem('players');
    setSaved(stored);
    if (stored) {
      return stored;
    }
    return false;
  };

  const onDeletePress = async (item: any) => {
    // console.log(item);
    const temp = saved.filter(i => i.id !== item.id);
    console.log('temop', temp);
    await AsyncStorage.setItem('players', JSON.stringify(temp));

    setSaved(temp);
  };

  return (
    <PageBackground>
      <PageTitle>Jogadores</PageTitle>
      <ScrollView contentContainerStyle={{gap: 16, paddingVertical: 16}}>
        <CustomInput onChangeText={setNewPlayer} value={newPlayer} />

        <CustomButton
          onPress={onSaveNewPlayer}
          disabled={newPlayer === '' || newPlayer?.length < 3}>
          Salvar jogador
        </CustomButton>
        <Text style={{color: Colors.main_text, fontWeight: 'bold'}}>
          Total jogadores cadastrados: {saved?.length || 0} jogadores
        </Text>
        {/* <View style={{gap: 8, height: 450}}> */}
        {saved?.map(i => (
          <View key={i.id} style={styles.playerWrapper}>
            <Text style={styles.playerName}>{i.name}</Text>
            <Pressable onPress={() => onDeletePress(i)}>
              <TrashCan />
            </Pressable>
          </View>
        ))}
        {/* </View> */}
      </ScrollView>
    </PageBackground>
  );
};

export default Players;
