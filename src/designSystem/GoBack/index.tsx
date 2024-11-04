import { Pressable, StyleSheet, Text } from 'react-native';
import { LeftArrow } from '../../icons';

import Colors from '../colorsPallete';

export default ({ onPress }: any) => {
  return (
    <Pressable style={styles.wrapper} onPress={onPress}>
      <LeftArrow />
      <Text style={styles.text}>Voltar</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});
