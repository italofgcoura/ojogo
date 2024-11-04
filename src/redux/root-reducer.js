import {combineReducers} from 'redux';

// import condominiumSlice from './condominiums/slice';
// import confirmationCodeSlice from './confirmationCode/slice';
// import generalSlice from './general/slice';
// import loginSlice from './login/slice';
// import registerSlice from './register/slice';
// import userSlice from './user/slice';
import generalSlice from './general/slice';
import playerSlice from './player/slice';
import teamSlice from './team/slice';
import userSlice from './user/slice';
export default combineReducers({
  player: playerSlice,
  general: generalSlice,
  team: teamSlice,
  user: userSlice,
  // user: userSlice,
  // login: loginSlice,
  // register: registerSlice,
  // general: generalSlice,
  // condominium: condominiumSlice,
  // confirmationCode: confirmationCodeSlice,
});
