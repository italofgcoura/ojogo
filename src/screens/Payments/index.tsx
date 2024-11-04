import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import PageBackground from '../../components/PageBackground';
import PageTitle from '../../components/PageTitle';
import {Colors, CustomButton} from '../../designSystem';
import NewPayment from './NewPayment';
import availableMonths from './availableMonths';

import {MonthlyPayments} from '../../interfaces';
import formatCurrency from '../../utils/formatCurrency';

export default () => {
  const screenWidth = Dimensions.get('window').width;

  const [payments, setPayments] = useState<MonthlyPayments[]>([]);

  const [addNewPayment, setAddNewPayment] = useState<boolean>(false);

  const handleSaveNewPayment = async (newPaymentData: any) => {
    const temp = [...payments];

    // "gambiarra" para tratar do timezone
    newPaymentData.date.setHours(12);

    const oldData: any = temp.findIndex(m => m.month === newPaymentData.month);

    if (oldData !== -1) {
      temp[oldData].payers.push({
        ...newPaymentData,
        id: uuidv4(),
      });
      savePayments(temp);
      return;
    }
    const newMonth: any = {
      month: newPaymentData.month,
      monthId: uuidv4(),
      payers: [{...newPaymentData, id: uuidv4()}],
    };
    savePayments([...payments, newMonth]);
  };

  const savePayments = async (newPayments: any) => {
    const orderedMonths = orderMonths(newPayments);

    console.log('orderedMonths', orderedMonths);

    setPayments(orderedMonths);
    await AsyncStorage.setItem('payments', JSON.stringify(orderedMonths));
  };

  const orderMonths = (newPayments: any) => {
    return newPayments.sort((a, b) => {
      return (
        availableMonths.indexOf(a.month) - availableMonths.indexOf(b.month)
      );
    });
  };

  useEffect(() => {
    (async () => {
      await AsyncStorage.removeItem('payments');

      const result = await AsyncStorage.getItem('payments');
      console.log('result', result);
      if (result) {
        setPayments(JSON.parse(result));
      }
    })();
  }, []);

  const handleShowNewPaymentModal = () => {
    setAddNewPayment(prevstate => !prevstate);
  };

  return (
    <>
      <NewPayment
        showNewPayment={addNewPayment}
        handleShowNewPayment={handleShowNewPaymentModal}
        handleSaveNewPayment={handleSaveNewPayment}
      />
      <PageBackground>
        <PageTitle>Pagamentos</PageTitle>
        {/* <ScrollView
        horizontal={true}
        // decelerationRate={0}
        // snapToInterval={screenDimensions - 60}
        // snapToAlignment={'center'}
        // contentInset={{
        //   top: 0,
        //   left: -10,
        //   bottom: 0,
        //   right: -10,
        // }}
      >
        {months.map((item, index) => (
          <View
            style={{
              width: screenDimensions - 100,
              // marginHorizontal: 10,
              marginRight: 10,
              height: '100%',

              paddingVertical: 16,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                flex: 1,
                borderRadius: 4,
                padding: 16,
              }}>
              <Text style={{color: 'blue'}}>{item.toUpperCase()}</Text>
              {payments[item]?.map(i => (
                <Text>{i.name}</Text>
              ))}
            </View>
          </View>
        ))}
      </ScrollView> */}
        <FlatList
          horizontal
          data={payments}
          keyExtractor={item => item.monthId}
          renderItem={({item}) => (
            <View
              style={{
                ...styles.monthWrapper,
                width:
                  payments?.length === 1 ? screenWidth - 16 : screenWidth - 110,
              }}>
              <View style={styles.monthContainer}>
                <Text style={{color: Colors.accent}}>
                  {item?.month.toUpperCase()}
                </Text>
                <ScrollView
                  contentContainerStyle={{paddingVertical: 8, gap: 8}}
                  showsVerticalScrollIndicator>
                  {item.payers?.map((i, index) => (
                    <View key={uuidv4()}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{color: Colors.main_text}}>{i.name}</Text>

                        <Text style={{color: Colors.main_text}}>
                          {formatCurrency(i.value)}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={{color: 'gray', fontSize: 10}}>
                          {new Date(i.date)
                            .getDate()
                            .toString()
                            .padStart(2, '0')}
                          /{new Date(i.date).getMonth() + 1}/
                          {new Date(i.date).getFullYear()}
                        </Text>
                        {/* <Text style={{color: 'gray', fontSize: 10}}>
                          {i.type || 'diaria'}
                        </Text> */}
                      </View>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <Text style={{color: 'gray', fontSize: 14, paddingTop: 16}}>
              Ainda não existe nenhum pagamento registrado
            </Text>
          )}
        />
        <CustomButton onPress={() => setAddNewPayment(true)}>
          novo pagamento
        </CustomButton>
      </PageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  monthWrapper: {
    height: '100%',
    padding: 16,
    paddingLeft: 0,
  },
  monthContainer: {
    backgroundColor: Colors.gray.background,
    flex: 1,
    borderRadius: 4,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
});
