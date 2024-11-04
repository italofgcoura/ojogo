import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Game from '../screens/Game';
import Payments from '../screens/Payments';
import PlayersScreen from '../screens/Players';
import Teams from '../screens/Teams';
import Menu from './Menu';

const Tab = createBottomTabNavigator();

export default () => {
  // const {user} = useAppSelector(rootReducer => rootReducer.user);

  // console.log(user);

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => <Menu {...props} />}
        screenOptions={{headerShown: false}}>
        <Tab.Screen name="teams" component={Teams} />
        <Tab.Screen name="game" component={Game} />
        <Tab.Screen name="players" component={PlayersScreen} />
        <Tab.Screen name="payments" component={Payments} />
        {/* <Tab.Screen name="teste" component={() => <Text>hello world</Text>} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
