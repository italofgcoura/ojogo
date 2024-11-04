import { createSlice } from '@reduxjs/toolkit';

export type tGeneral = {
  loading: boolean;
  success: boolean;
  error: { error_code: number | null; title: string; message: string };
};

export const initialErrorState: tGeneral = {
  loading: false,
  success: false,
  error: { error_code: null, title: '', message: '' },
};

export const generalSlice = createSlice({
  name: 'general',
  initialState: initialErrorState,
  reducers: {
    startRequest: state => {
      return { ...state, loading: true };
    },
    finishRequest: state => {
      return { ...state, loading: false };
    },
    setRequestSuccess: (state, action) => {
      return { ...state, success: action.payload };
    },
    setError: (state, action) => {
      return { ...state, error: action.payload };
    },
    resetError: state => {
      return { ...state, error: initialErrorState.error };
    },
  },
});

export const {
  startRequest,
  setRequestSuccess,
  finishRequest,
  setError,
  resetError,
} = generalSlice.actions;

export default generalSlice.reducer;
