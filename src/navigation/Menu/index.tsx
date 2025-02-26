import {NavigationState} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import featureFlag from '../../featureFlag';
import {useAppSelector} from '../../hooks';
import {Ball, Cash, Players} from '../../icons';
import MenuItem from '../MenuItem';
import styles from './styles';

interface IProps {
  state: NavigationState;
  navigation: any;
}

const Menu = ({state, navigation}: IProps) => {
  const {user} = useAppSelector((rootReducer): any => rootReducer.user);

  return (
    <View style={styles.wrapper}>
      <MenuItem
        title="Times"
        Icon={Ball}
        onPress={() => navigation.navigate('teams')}
        active={state.index === 0}
      />
      <MenuItem
        title="Jogo"
        Icon={Ball}
        onPress={() => navigation.navigate('game')}
        active={state.index === 1}
      />
      {featureFlag.addNewPlayers && (
        <MenuItem
          title="Jogadores"
          Icon={Players}
          onPress={() => navigation.navigate('players')}
          active={state.index === 2}
        />
      )}
      {featureFlag.payments && (
        <MenuItem
          title="Pagamentos"
          Icon={Cash}
          onPress={() => navigation.navigate('payments')}
          active={state.index === 3}
        />
      )}
    </View>
  );
};

export default Menu;
