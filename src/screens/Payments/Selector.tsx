import React from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../designSystem';

interface IProps {
  options: any;
  selectedItem: any;
  // label: string;
  onItemPress: (player: any) => void;
}

export default ({options, selectedItem, onItemPress}: IProps) => {
  return (
    <ScrollView
      style={styles.selectorWrapper}
      contentContainerStyle={{
        gap: 12,
        padding: 8,
      }}>
      {options.map(item => (
        <TouchableOpacity
          style={{fontSize: 14}}
          key={item.id}
          onPress={onItemPress}>
          <Text
            style={
              (styles.text,
              selectedItem.name === item.name && {color: Colors.accent})
            }>
            {item.name.toUpperCase()}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectorWrapper: {
    height: 130,
    borderColor: Colors.accent,
    borderWidth: 1,
  },
  text: {
    fontFamily: 'Roboto-Bold',
    color: Colors.primary,
    fontSize: 14,
  },
});
