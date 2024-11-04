import {StyleSheet} from 'react-native';
import {Colors} from '../../designSystem';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: Colors.gray.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.disabled,
    position: 'relative',
    width: '100%',
  },
  title: {
    color: Colors.primary,
    fontWeight: 'black',
    fontFamily: 'Roboto-Black',
    fontSize: 24,
  },
  buildVersion: {
    position: 'absolute',
    right: 5,
    bottom: 5,
    fontSize: 10,
  },
  buildVersionText: {
    fontSize: 10,
    color: Colors.main_text,
    fontFamily: 'Roboto-Light',
  },
});

export default styles;
