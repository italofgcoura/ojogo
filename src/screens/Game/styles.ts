import {StyleSheet} from 'react-native';
import {Colors} from '../../designSystem';

export default StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 16,
    backgroundColor: Colors.gray.background,
  },
  teamTitle: {
    color: Colors.white,
    fontSize: 16,
    textAlign: 'center',
    padding: 4,
    fontFamily: 'Roboto-Bold',
  },
  teamPlayer: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  team: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 2,
    borderWidth: 1,
    backgroundColor: Colors.primary,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 'auto',
    borderRadius: 4,
  },
});
