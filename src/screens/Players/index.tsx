import React, {useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import {PageBackground, PageTitle} from '../../components';

import {Colors, CustomButton, CustomInput} from '../../designSystem';
import {TrashCan} from '../../icons';
import {getItem, setItem} from '../../utils/localStorage';
import styles from './styles';
const Players = () => {
  useEffect(() => {
    getStoredPlayers();
  }, []);

  const [saved, setSaved] = useState<{name: string; id: string}[]>([]);
  const [newPlayer, setNewPlayer] = useState('');
  const [playerSkill, setPlayerSkill] = useState<number>(0);
  const onSaveNewPlayer = async () => {
    try {
      const stored = await getStoredPlayers();
      if (stored) {
        stored.push({name: newPlayer, id: uuidv4(), playerSkill});

        const jsonValue = JSON.stringify(stored);

        await setItem('players', jsonValue);
        setNewPlayer('');
        getStoredPlayers();
        return;
      }
      const jsonValue = JSON.stringify([{name: newPlayer, id: uuidv4()}]);

      await setItem('players', jsonValue);
      getStoredPlayers();
      setNewPlayer('');
    } catch (e) {
      console.log('e', e);
      // saving error
    }
  };

  const getStoredPlayers = async () => {
    const stored = await getItem('players');
    console.log('stored>>>>', stored);
    setSaved(stored);
    if (stored) {
      return stored;
    }
    return false;
  };

  const onDeletePress = async (item: any) => {
    const temp = saved.filter(i => i.id !== item.id);

    await setItem('players', JSON.stringify(temp));

    setSaved(temp);
  };

  return (
    <PageBackground>
      <PageTitle>Jogadores</PageTitle>
      <ScrollView contentContainerStyle={{gap: 16, paddingVertical: 16}}>
        <CustomInput onChangeText={setNewPlayer} value={newPlayer} />
        <Text style={{color: Colors.main_text, fontWeight: 'bold'}}>
          Selecione de 1 a 5 a habilidade do jogador:
        </Text>
        <View style={styles.playerSkillContainer}>
          <TouchableOpacity
            style={[
              styles.playerSkill,
              playerSkill === 1 && {backgroundColor: Colors.accent},
            ]}
            onPress={() => setPlayerSkill(1)}>
            <Text style={styles.playerSkillText}>1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.playerSkill,
              playerSkill === 2 && {backgroundColor: Colors.accent},
            ]}
            onPress={() => setPlayerSkill(2)}>
            <Text style={styles.playerSkillText}>2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.playerSkill,
              playerSkill === 3 && {backgroundColor: Colors.accent},
            ]}
            onPress={() => setPlayerSkill(3)}>
            <Text style={styles.playerSkillText}>3</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.playerSkill,
              playerSkill === 4 && {backgroundColor: Colors.accent},
            ]}
            onPress={() => setPlayerSkill(4)}>
            <Text style={styles.playerSkillText}>4</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.playerSkill,
              playerSkill === 5 && {backgroundColor: Colors.accent},
            ]}
            onPress={() => setPlayerSkill(5)}>
            <Text style={styles.playerSkillText}>5</Text>
          </TouchableOpacity>
        </View>
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
