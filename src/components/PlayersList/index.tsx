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
      {players.map((player: IPlayerDraw, index) => (
        <View
          key={player.id}
          style={{
            ...styles.playerButtonWrapper,
          }}>
          <CustomButton
            type={isSelected(player) ? 'alert' : 'success'}
            onPress={() => onPlayerPress(player)}>
            {player?.name}
          </CustomButton>
        </View>
      ))}

      {/* <FlatList
        data={players?.sort((a, b) => a?.name.localeCompare(b?.name))}
        keyExtractor={item => String(item?.id)}
        showsVerticalScrollIndicator
        columnWrapperStyle={{gap: 16}}
        contentContainerStyle={{gap: 16}}
        ListEmptyComponent={() => <Text>no item</Text>}
        renderItem={({item, index}) => {
          const lastItem = index === players.length - 1;
          return (
            <View
              style={{
                ...styles.playerButtonWrapper,
                maxWidth: lastItem ? '50%' : '100%',
                paddingRight: lastItem && players.length % 2 == 1 ? 8 : 0,
              }}>
              <CustomButton
                type={isSelected(item) ? 'alert' : 'success'}
                customStyles={{height: 36}}
                onPress={() => onPlayerPress(item)}>
                {item?.name}
              </CustomButton>
            </View>
          );
        }}
        horizontal={false}
        numColumns={2}
      /> */}
    </View>
  );
};
