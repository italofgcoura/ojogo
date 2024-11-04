import {createSlice} from '@reduxjs/toolkit';
import initialState from './initialState';

export const teamSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setTeams: (state, action) => {
      return {...state, drawnTeams: action.payload};
    },
  },
});

export const {setTeams} = teamSlice.actions;

export default teamSlice.reducer;
