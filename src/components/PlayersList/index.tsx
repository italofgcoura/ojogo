import React from 'react';
import {View} from 'react-native';
import {CustomButton} from '../../designSystem';
import {IPlayerDraw} from '../../interfaces';
import styles from './styles';

interface IProps {
  players: IPlayerDraw[];
  isSelected: (item: IPlayerDraw) => boolean;
  onPlayerPress: (item: IPlayerDraw) => void;
}

export default ({players, isSelected, onPlayerPress}: IProps) => {
  return (
    <View style={styles.listWrapper}>
      {players.map((player: IPlayerDraw) => (
        <View
          key={player.id}
          style={{
            ...styles.playerButtonWrapper,
          }}>
          <CustomButton
            type={isSelected(player) ? 'alert' : 'success'}
            onPress={() => onPlayerPress(player)}>
            {`${player?.name} - ${player?.playerSkill}`}
          </CustomButton>
        </View>
      ))}
    </View>
  );
};
