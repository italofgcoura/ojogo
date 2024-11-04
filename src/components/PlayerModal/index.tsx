import React from 'react';
import {Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Colors} from '../../designSystem';
import {useAppDispatch} from '../../hooks';
import {setDrawnPlayers} from '../../redux/player/slice';
import {tRootState} from '../../redux/store';
import ModalWrapper from '../ModalWrapper';

export default () => {
  const {drawnPlayers} = useSelector(
    (rootReducer: tRootState) => rootReducer.player,
  );

  const dispatch = useAppDispatch();

  const onCloseModal = () => {
    dispatch(setDrawnPlayers(null));
  };

  console.log('drawnPlayers', drawnPlayers);

  return (
    <ModalWrapper visible={drawnPlayers !== null} closeModal={onCloseModal}>
      <View style={{gap: 8}}>
        {drawnPlayers?.map(item => (
          <Text
            key={item.id}
            style={{
              color: Colors.main_text,
              fontFamily: 'Roboto-Bold',
              fontSize: 14,
            }}>
            {String(item.name).toUpperCase()}
          </Text>
        ))}
      </View>
    </ModalWrapper>
  );
};
