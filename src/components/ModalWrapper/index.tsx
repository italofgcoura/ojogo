import React from 'react';
import {
  Modal,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {Colors} from '../../designSystem';
import {Close} from '../../icons';

type iModalWrapper = {
  children: React.ReactNode;
  visible: boolean;
  closeModal: () => void;
  style?: StyleProp<ViewStyle>;
  animationType?: 'fade';
};

export default ({children, visible, closeModal, style}: iModalWrapper) => {
  return (
    <Modal visible={visible} transparent animationType={'fade'}>
      <View style={generalStyles.modalWrapper}>
        <View style={[generalStyles.container, style]}>
          <Pressable style={generalStyles.close} onPress={closeModal}>
            <Close />
          </Pressable>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const generalStyles = StyleSheet.create({
  modalWrapper: {
    backgroundColor: 'rgba(000,000,000,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 24,
  },
  container: {
    backgroundColor: Colors.gray.background,
    borderRadius: 8,
    padding: 16,
    width: '100%',
    gap: 24,
    borderWidth: 2,
    borderColor: Colors.accent,
    position: 'relative',
    minHeight: 100,
  },
  close: {
    position: 'absolute',
    width: 36,
    height: 36,
    right: -12,
    top: -12,
    backgroundColor: Colors.white,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
  },
});
