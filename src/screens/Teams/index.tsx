import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {v4 as uuidv4} from 'uuid';
import PageBackground from '../../components/PageBackground';
import PageTitle from '../../components/PageTitle';
import PlayersList from '../../components/PlayersList';
import {CustomButton} from '../../designSystem';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {IPlayer, IPlayerDraw} from '../../interfaces';
import {setStoredPlayers} from '../../redux/player/slice';
import {setTeams} from '../../redux/team/slice';
import {getItem} from '../../utils/localStorage';
import MountTeam from '../MountTeam';
import styles from './styles';

export default () => {
  // const [players, setPlayers] = useState<IPlayerDraw[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<IPlayer[]>([]);
  const [mountTeam, setMountTeam] = useState<boolean>(false);
  const [availablePlayers, setAvailablePlayers] = useState<IPlayerDraw[]>([]);
  const dispatch = useAppDispatch();
  const {drawnTeams} = useAppSelector(rootReducer => rootReducer.team);

  const {storedPlayers} = useAppSelector(rootReducer => rootReducer.player);

  const {user} = useAppSelector(rootReducer => rootReducer.user);

  console.log('user', user);

  useFocusEffect(
    useCallback(() => {
      getStoredPlayers();
    }, []),
  );

  const getStoredPlayers = async () => {
    const players = await getItem('players');

    // setPlayers(storedPlayers || []);
    dispatch(setStoredPlayers(players || []));
  };

  function drawTeams(array: IPlayer[], teamLength = 6) {
    let playersToDrawn: IPlayerDraw[] = array.map(p => {
      return {...p, randomNumber: Math.floor(Math.random() * 101)};
    });

    playersToDrawn.sort((a, b) => a.randomNumber - b.randomNumber);

    const resultado: IPlayerDraw[][] = [];
    for (let i = 0; i < playersToDrawn.length; i += teamLength) {
      resultado.push(playersToDrawn.slice(i, i + teamLength));
    }

    dispatch(setTeams(resultado));

    setSelectedPlayers([]);
  }
  const isSelected = (item: IPlayer) => {
    const result = selectedPlayers.find((i: IPlayer) => i.id === item.id);
    return result !== undefined;
  };

  const onPlayerPress = (item: IPlayer) => {
    if (!isSelected(item)) {
      setSelectedPlayers(prevState => [...prevState, item]);
      return;
    }

    const filter = selectedPlayers.filter(i => i.id !== item.id);

    setSelectedPlayers(filter);
  };

  const onMountTeamPress = () => {
    const teamPlayerIds = drawnTeams!.flat().map(player => player.id);

    setAvailablePlayers(
      storedPlayers.filter(player => !teamPlayerIds.includes(player.id)),
    );

    setMountTeam(true);
  };

  const onDeleteTeam = (index: number) => {
    let drawnTeamsDuplicate = drawnTeams.map(team => [...team]);
    drawnTeamsDuplicate.splice(index, 1);
    dispatch(setTeams([...drawnTeamsDuplicate]));
  };

  return (
    <PageBackground>
      <MountTeam
        mountTeam={mountTeam}
        onClose={() => setMountTeam(false)}
        players={availablePlayers}
      />

      <View
        style={{
          flex: 1,
        }}>
        {storedPlayers.length === 0 && (
          <PageTitle>Ainda não existem times cadastrados</PageTitle>
        )}
        {storedPlayers.length > 0 && (
          <PageTitle>Selecione os jogadores para sorteio dos times:</PageTitle>
        )}
        <ScrollView
          contentContainerStyle={{
            width: '100%',
            paddingVertical: 16,
            gap: 16,
          }}>
          <PlayersList
            players={storedPlayers}
            isSelected={isSelected}
            onPlayerPress={onPlayerPress}
          />

          {drawnTeams?.map((i, index) => (
            <View style={styles.teamWrapper} key={uuidv4()}>
              <Text style={styles.teamTitle}>Time {index + 1}</Text>
              {i?.map(j => (
                <Text style={styles.teamPlayer}>{j.name}</Text>
              ))}
              <TouchableOpacity onPress={() => onDeleteTeam(index)}>
                <Text style={styles.deleteTeam}>deletar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
      {storedPlayers.length > 0 && (
        <View style={styles.buttonsContainer}>
          <CustomButton
            disabled={selectedPlayers.length === 0}
            onPress={() => drawTeams(selectedPlayers)}
            customStyles={{flex: 1}}>
            sortear times
          </CustomButton>
          <CustomButton onPress={onMountTeamPress} customStyles={{flex: 1}}>
            montar times
          </CustomButton>
        </View>
      )}
    </PageBackground>
  );
};
