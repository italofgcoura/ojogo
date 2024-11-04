import {createSlice} from '@reduxjs/toolkit';
import initialState from './initialState';

export const userSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {...state, user: action.payload};
    },
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
