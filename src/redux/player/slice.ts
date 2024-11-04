import {createSlice} from '@reduxjs/toolkit';
import initialState from './initialState';

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setDrawnPlayers: (state, action) => {
      return {...state, drawnPlayers: action.payload};
    },
    setStoredPlayers: (state, action) => {
      return {...state, storedPlayers: action.payload};
    },
  },
});

export const {setDrawnPlayers, setStoredPlayers} = playerSlice.actions;

export default playerSlice.reducer;
