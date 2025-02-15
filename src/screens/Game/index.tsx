import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import 'react-native-get-random-values';
import {useSelector} from 'react-redux';

import {PageBackground, PageTitle, PlayersList} from '../../components';
import {Colors, CustomButton} from '../../designSystem';
import {useAppDispatch} from '../../hooks';
import {IPlayerDraw} from '../../interfaces';
import {setDrawnPlayers} from '../../redux/player/slice';
import {tRootState} from '../../redux/store';
import {getItem} from '../../utils/localStorage';

import styles from './styles';

const Game = () => {
  const dispatch = useAppDispatch();
  const [players, setPlayers] = useState<IPlayerDraw[]>([]);

  const [selectedPlayers, setSelectedPlayers] = useState<IPlayerDraw[]>([]);

  const [numberOfPlayersToDrawn, setSumberOfPlayersToDrawn] =
    useState<number>(0);

  const getStoredPlayers = async () => {
    setPlayers((await getItem('players')) || []);
  };

  const {drawnTeams} = useSelector(
    (rootReducer: tRootState) => rootReducer.team,
  );

  useFocusEffect(
    useCallback(() => {
      getStoredPlayers();
    }, []),
  );

  const isSelected = (item: IPlayerDraw) => {
    const result = selectedPlayers.find((i: IPlayerDraw) => i.id === item.id);
    return result !== undefined;
  };

  const onPlayerPress = (item: IPlayerDraw) => {
    if (!isSelected(item)) {
      setSelectedPlayers(prevState => [...prevState, item]);
      return;
    }

    const filter = selectedPlayers.filter(i => i.id !== item.id);

    setSelectedPlayers(filter);
  };

  const onPlayersDrawn = () => {
    let playersToDrawn: IPlayerDraw[] = selectedPlayers.map(p => {
      return {...p, randomNumber: Math.floor(Math.random() * 101)};
    });

    playersToDrawn.sort((a, b) => a.randomNumber - b.randomNumber);

    dispatch(setDrawnPlayers(playersToDrawn.slice(0, numberOfPlayersToDrawn)));
  };

  const onNumberOfPlayerPress = (number: number) => {
    setSumberOfPlayersToDrawn(number);
  };
  console.log('drawnTeams', drawnTeams);
  return (
    <PageBackground>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: Colors.gray.background,
          width: '100%',
          gap: 8,
        }}>
        {drawnTeams?.length > 0 && (
          <PageTitle>Selecione o time para sair alguém:</PageTitle>
        )}
        {drawnTeams?.length === 0 && (
          <PageTitle>Ainda não existem times sorteados</PageTitle>
        )}
        <View style={{gap: 4}}>
          {drawnTeams.length > 0 &&
            drawnTeams?.map((team: IPlayerDraw[], index) => {
              console.log('teams', team);
              return (
                <TouchableOpacity
                  key={index}
                  style={styles.team}
                  onPress={() => setSelectedPlayers(drawnTeams[index])}>
                  <Text style={styles.teamTitle}>Time {index + 1}: </Text>
                  {team?.map((j: any) => (
                    <Text style={styles.teamPlayer}>{j.name} </Text>
                  ))}
                </TouchableOpacity>
              );
            })}
        </View>

        {drawnTeams?.length > 0 && (
          <>
            <PageTitle>Ou selecione os jogadores na lista abaixo:</PageTitle>
            <PlayersList
              players={players?.sort((a, b) => a?.name.localeCompare(b?.name))}
              isSelected={isSelected}
              onPlayerPress={onPlayerPress}
            />
          </>
        )}

        {drawnTeams?.length > 0 && (
          <>
            <PageTitle>Quantidade de jogadores a ficar em campo:</PageTitle>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                // flex: 1,
                gap: 8,
                marginBottom: 8,
              }}>
              <CustomButton
                type={
                  selectedPlayers.length < 2
                    ? 'disabled'
                    : numberOfPlayersToDrawn === 1
                    ? 'alert'
                    : 'success'
                }
                onPress={() => onNumberOfPlayerPress(1)}
                disabled={selectedPlayers.length < 2}
                customStyles={{flex: 1}}>
                1
              </CustomButton>
              <CustomButton
                customStyles={{flex: 1}}
                type={
                  selectedPlayers.length < 3
                    ? 'disabled'
                    : numberOfPlayersToDrawn === 2
                    ? 'alert'
                    : 'success'
                }
                onPress={() => onNumberOfPlayerPress(2)}
                disabled={selectedPlayers.length < 3}>
                2
              </CustomButton>
              <CustomButton
                customStyles={{flex: 1}}
                type={
                  selectedPlayers.length < 4
                    ? 'disabled'
                    : numberOfPlayersToDrawn === 3
                    ? 'alert'
                    : 'success'
                }
                onPress={() => onNumberOfPlayerPress(3)}
                disabled={selectedPlayers.length < 4}>
                3
              </CustomButton>
              <CustomButton
                customStyles={{flex: 1}}
                type={
                  selectedPlayers.length < 5
                    ? 'disabled'
                    : numberOfPlayersToDrawn === 4
                    ? 'alert'
                    : 'success'
                }
                onPress={() => onNumberOfPlayerPress(4)}
                disabled={selectedPlayers.length < 5}>
                4
              </CustomButton>
              <CustomButton
                customStyles={{flex: 1}}
                type={
                  selectedPlayers.length < 6
                    ? 'disabled'
                    : numberOfPlayersToDrawn === 5
                    ? 'alert'
                    : 'success'
                }
                onPress={() => onNumberOfPlayerPress(5)}
                disabled={selectedPlayers.length < 6}>
                5
              </CustomButton>
              <CustomButton
                customStyles={{flex: 1}}
                type={
                  selectedPlayers.length < 7
                    ? 'disabled'
                    : numberOfPlayersToDrawn === 6
                    ? 'alert'
                    : 'success'
                }
                onPress={() => onNumberOfPlayerPress(6)}
                disabled={selectedPlayers.length < 7}>
                6
              </CustomButton>
            </View>
            <CustomButton
              type="success"
              onPress={onPlayersDrawn}
              disabled={
                numberOfPlayersToDrawn === 0 || selectedPlayers.length < 2
              }>
              SORTEAR
            </CustomButton>
          </>
        )}
      </ScrollView>
    </PageBackground>
  );
};

export default Game;
