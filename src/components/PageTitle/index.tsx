import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Colors} from '../../designSystem';

interface IProps {
  children: React.ReactNode;
}

export default ({children}: IProps) => {
  return <Text style={styles.text}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: Colors.main_text,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Roboto-Bold',
    // backgroundColor: Colors.gray.background,
  },
});
