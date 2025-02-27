import React from 'react';
import {Text, View} from 'react-native';
import {getBuildNumber, getVersion} from 'react-native-device-info';
import {Ball} from '../../icons';
import styles from './styles';
export default () => {
  return (
    <View style={styles.wrapper}>
      <Ball />
      <Text style={styles.title}>Jogo</Text>
      {/* <View style={styles.buildVersion}>
        <Text style={styles.buildVersionText}>
          Build: {getBuildNumber()} - Versão: {getVersion()}
        </Text>
      </View> */}
    </View>
  );
};
