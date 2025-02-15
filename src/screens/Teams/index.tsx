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
    // let playersToDrawn: IPlayerDraw[] = array.map(p => {
    //   return {...p, randomNumber: Math.floor(Math.random() * 101)};
    // });

    // playersToDrawn.sort((a, b) => a.randomNumber - b.randomNumber);

    // const resultado: IPlayerDraw[][] = [];
    // for (let i = 0; i < playersToDrawn.length; i += teamLength) {
    //   resultado.push(playersToDrawn.slice(i, i + teamLength));
    // }

    const {teams} = balanceTeams(array, 2);

    dispatch(setTeams(teams));

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

  console.log('drawnTeams', drawnTeams);

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

              {i?.players?.map(j => (
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

function balanceTeams(players: any[], teamCount: number) {
  // Função para embaralhar o array de jogadores
  function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Troca de posição
    }
  }

  // Embaralha os jogadores antes de distribuir
  shuffle(players);

  // Ordena os jogadores por skill (do maior para o menor)
  players.sort((a, b) => b.playerSkill - a.playerSkill);

  // Inicializa os times
  let teams = Array.from({length: teamCount}, () => ({
    players: [],
    totalSkill: 0,
  }));

  // Distribui os jogadores nos times de forma balanceada
  for (let player of players) {
    // Encontra o time com a menor skill total
    let weakestTeam = teams.reduce(
      (minTeam, team) =>
        team.totalSkill < minTeam.totalSkill ? team : minTeam,
      teams[0],
    );

    // Adiciona o jogador ao time mais fraco
    weakestTeam.players.push(player);
    weakestTeam.totalSkill += player.playerSkill;
  }

  // Se o número de jogadores for ímpar, o último jogador fica de fora
  let totalPlayers = players.length;
  let playersPerTeam = Math.floor(totalPlayers / teamCount);
  let remainder = totalPlayers % teamCount;
  let playerOut = remainder ? teams[teams.length - 1].players.pop() : null;

  console.log('teams', teams);
  console.log('Jogador de fora:', playerOut);

  return {teams, playerOut};
}

// Exemplo de uso:
// const players = [
//   {name: 'Alice', weight: 8},
//   {name: 'Bob', weight: 6},
//   {name: 'Charlie', weight: 1},
//   {name: 'David', weight: 4},
//   {name: 'Eve', weight: 7},
//   {name: 'Frank', weight: 5},
//   {name: 'Grace', weight: 9},
//   {name: 'Hank', weight: 3},
//   {name: 'Ivy', weight: 2},
// ];

// const {teams, playerOut} = balanceTeams(players, 2);

// Exibe os times e os jogadores de cada time
// teams.forEach((team, index) => {
//   console.log(`Time ${index + 1}:`);
//   team.players.forEach(player =>
//     console.log(`  ${player.name} (Peso: ${player.weight})`),
//   );
// });

// if (playerOut) {
//   console.log(`Jogador de fora: ${playerOut.name} (Peso: ${playerOut.weight})`);
// }
