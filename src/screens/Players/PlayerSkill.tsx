import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PlayerSkill} from '../../icons';
import {Colors} from '../../designSystem';

export default ({playerSkill}: {playerSkill: number}) => {
  if (!playerSkill) {
    return;
  }
  return (
    <View style={styles.container}>
      {[...Array(Number(playerSkill))].map(_ => (
        <PlayerSkill primary={Colors.main_text} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    marginTop: 8,
  },
});
