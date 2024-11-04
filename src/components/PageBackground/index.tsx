import React from 'react';
import {StyleProp, StyleSheet, View, ViewProps} from 'react-native';
import {Colors} from '../../designSystem';

interface IProps {
  children: React.ReactNode;
  customStyles?: StyleProp<ViewProps>;
}

export default ({children}: IProps) => {
  return <View style={styles.wrapper}>{children}</View>;
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.gray.background,
    flex: 1,
    padding: 16,
  },
});
