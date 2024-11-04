import {StyleSheet} from 'react-native';
import {Colors} from '../../designSystem';

export default StyleSheet.create({
  listWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    width: '100%',
    backgroundColor: Colors.gray.background,
    flexWrap: 'wrap',
  },
  playerButtonWrapper: {
    width: '45%',
    height: 44,
    alignSelf: 'flex-start',
  },
});
