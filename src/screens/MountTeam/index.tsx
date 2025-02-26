import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import ModalWrapper from '../../components/ModalWrapper';
import PlayersList from '../../components/PlayersList';
import {CustomButton} from '../../designSystem';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {IPlayerDraw} from '../../interfaces';
import {setTeams} from '../../redux/team/slice';
import orderByName from '../../utils/orderPlayers';

interface IProps {
  mountTeam: boolean;
  onClose: () => void;
  players: IPlayerDraw[];
}

export default ({mountTeam, players, onClose}: IProps) => {
  const [selectedPlayers, setSelectedPlayers] = useState<IPlayerDraw[]>([]);
  const {drawnTeams} = useAppSelector(rootReducer => rootReducer.team);

  const dispatch = useAppDispatch();

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

  const mountNewTeam = () => {
    let newTeam: IPlayerDraw[] = selectedPlayers.map(p => {
      return {...p, randomNumber: Math.floor(Math.random() * 101)};
    });

    let temp: IPlayerDraw[][] = [...(drawnTeams || [])];

    temp.push(newTeam);

    dispatch(setTeams(temp));

    setSelectedPlayers([]);

    onClose();
  };

  return (
    <ModalWrapper visible={mountTeam} closeModal={onClose}>
      <ScrollView style={{height: 500}}>
        <PlayersList
          players={orderByName(players)}
          isSelected={isSelected}
          onPlayerPress={onPlayerPress}
        />
      </ScrollView>
      <View style={{height: 44, width: '100%'}}>
        <CustomButton onPress={mountNewTeam} customStyles={{height: 44}}>
          montar time
        </CustomButton>
      </View>
    </ModalWrapper>
  );
};
