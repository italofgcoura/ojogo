import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalWrapper from '../../components/ModalWrapper';
import {Colors, CustomButton, CustomInput} from '../../designSystem';
import {useAppSelector} from '../../hooks';
// import formatCurrency from '../../utils/formatCurrency';
import formatCurrency from '../../utils/formatCurrency';
import availableMonths from './availableMonths';

interface IProps {
  showNewPayment: boolean;
  handleShowNewPayment: () => void;
  handleSaveNewPayment: (newPaymentData: {
    name: string;
    value: number;
    date: Date;
    month: string;
  }) => void;
}

export default ({
  showNewPayment,
  handleShowNewPayment,
  handleSaveNewPayment,
}: IProps) => {
  const [newPaymentData, setNewPaymentData] = useState({
    name: '',
    value: '',
    date: new Date(),
    month: '',
  });

  console.log('newPaymentData', newPaymentData);

  const {storedPlayers} = useAppSelector(rootReducer => rootReducer.player);

  // Função para desmascarar o valor e converter para número
  const desmascararValor = maskedValue => {
    const unmaskedValue = maskedValue.replace(/[R$.\s]/g, '').replace(',', '.');
    return parseFloat(unmaskedValue);
  };

  // Função para simular o envio do valor para a API
  const enviarValor = () => {
    const valorDesmascarado = desmascararValor(value);
    console.log('Valor enviado para a API:', valorDesmascarado);
  };

  const handleSavePress = () => {
    const unmaskedValue = desmascararValor(newPaymentData.value);
    console.log('unmaskedValue', unmaskedValue);
    handleSaveNewPayment(newPaymentData);
    handleShowNewPayment();
    resetFields();
  };

  const resetFields = () => {
    setNewPaymentData({name: '', value: '', date: new Date(), month: ''});
  };

  // const onPlayerSelect = (player: any) => {
  //   () => setNewPaymentData({...newPaymentData, name: player.name});
  // };

  // const onMonthSelect = (month: string) => {
  //   setNewPaymentData({...newPaymentData, month});
  // };

  // Função para formatar como moeda (R$ XX,XX)

  // Função chamada ao alterar o valor do input
  const handleInputChange = (text: string) => {
    const formattedValue = formatCurrency(text);
    setNewPaymentData({...newPaymentData, value: formattedValue});
  };

  return (
    <ModalWrapper
      visible={showNewPayment}
      closeModal={() => {
        handleShowNewPayment();
        resetFields();
      }}>
      <View>
        <Text>Selecione o jogador que pagou o que devia:</Text>
        {/* <Selector
          options={storedPlayers}
          onItemPress={onPlayerSelect}
          selectedItem={newPaymentData}
        /> */}
        <ScrollView
          style={styles.selectorWrapper}
          contentContainerStyle={{
            gap: 12,
            padding: 8,
          }}>
          {storedPlayers.map(item => (
            <TouchableOpacity
              style={[
                styles.selectedItem,
                newPaymentData.name === item.name && {
                  backgroundColor: Colors.accent_fade,
                },
              ]}
              key={item.id}
              onPress={() =>
                setNewPaymentData({...newPaymentData, name: item.name})
              }>
              <Text
                style={[
                  styles.text,
                  newPaymentData.name === item.name && {color: Colors.accent},
                ]}>
                {item.name.toUpperCase()}
              </Text>
              {newPaymentData.name === item.name && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    backgroundColor: Colors.accent,
                  }}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View>
        <Text>Selecione o mês:</Text>
        {/* <Selector
          options={availableMonths}
          onItemPress={onMonthSelect}
          selectedItem={newPaymentData}
        /> */}
        <ScrollView
          style={styles.selectorWrapper}
          contentContainerStyle={{gap: 12, padding: 8}}>
          {availableMonths.map(item => (
            <TouchableOpacity
              key={item}
              style={[
                styles.selectedItem,
                newPaymentData.month === item && {
                  backgroundColor: Colors.accent_fade,
                },
              ]}
              onPress={() =>
                setNewPaymentData({...newPaymentData, month: item})
              }>
              <Text
                style={[
                  styles.text,
                  newPaymentData.month === item && {color: Colors.accent},
                ]}>
                {item.toUpperCase()}
              </Text>
              {newPaymentData.month === item && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 50,
                    backgroundColor: Colors.accent,
                  }}
                />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <CustomInput
        onChangeText={handleInputChange}
        keyboardType="numeric"
        value={`R$ ${newPaymentData.value}`}
        placeholder="Digite o valor:"
      />

      <CustomButton
        onPress={handleSavePress}
        disabled={
          !newPaymentData.name || !newPaymentData.month || !newPaymentData.value
        }>
        salvar pagamento
      </CustomButton>
    </ModalWrapper>
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
    color: Colors.main_text,
    fontSize: 14,
  },
  selectedItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
  },
});
