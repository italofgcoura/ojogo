import {StyleSheet} from 'react-native';
import {Colors} from '../../designSystem';

export default StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.gray.background,
    // paddingHorizontal: 24,
    // paddingVertical: 12,
    gap: 8,
    // minHeight: '100%',
  },
  container: {
    // gap: 16,
    // justifyContent: 'center',
    // alignItems: 'center',
    // width: '100%',
  },
  playerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    // padding: 8,
  },
  playerName: {
    textAlign: 'left',
    color: Colors.main_text,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
  },
  playerSkillContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerSkill: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  playerSkillText: {
    fontFamily: 'Roboto-Bold',
    color: Colors.main_text,
  },
});
