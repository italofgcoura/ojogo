import {configureStore} from '@reduxjs/toolkit';
import {UnknownAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import rootReducer from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export type tRootState = ReturnType<typeof store.getState>;

export type tAppDispatch = typeof store.dispatch;

export type tStore = typeof store;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  tRootState,
  unknown,
  UnknownAction
>;
