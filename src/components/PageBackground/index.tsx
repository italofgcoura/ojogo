import React from 'react';
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
} from 'react-native';
import {Colors} from '../../designSystem';
import Header from '../Header';

interface IProps {
  children: React.ReactNode;
  customStyles?: StyleProp<ViewProps>;
}

export default ({children}: IProps) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.wrapper}>
        <Header />
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.gray.background,
    flex: 1,
    padding: 16,
  },
});
