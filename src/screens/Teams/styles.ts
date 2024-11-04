import {StyleSheet} from 'react-native';
import {Colors} from '../../designSystem';

export default StyleSheet.create({
  wrapper: {
    padding: 16,
    gap: 16,
    // backgroundColor: Colors.gray.background,
    // flex: 1,
  },
  teamWrapper: {
    gap: 4,
    borderWidth: 1,
    borderColor: Colors.gray.disabled,
    padding: 4,
  },
  teamTitle: {
    color: Colors.main_text,
    fontSize: 18,
    textAlign: 'center',
    padding: 4,
    fontFamily: 'Roboto-Bold',
  },
  teamPlayer: {
    color: Colors.secondary_text,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  deleteTeam: {
    color: Colors.accent,
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    textAlign: 'right',
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
});
