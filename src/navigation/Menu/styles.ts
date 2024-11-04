import {StyleSheet} from 'react-native';
import {Colors} from '../../designSystem';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopColor: Colors.gray.disabled,
    borderTopWidth: 1,
    padding: 8,
    paddingHorizontal: 24,
    backgroundColor: Colors.gray.background,
  },
});

export default styles;
