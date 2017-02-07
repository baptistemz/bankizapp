import {combineReducers} from 'redux';
import AuthReducer from './auth_reducer';
import MusicReducer from './music_reducer';
import RoomReducer from './room_reducer';
import {reducer as toastrReducer} from 'react-redux-toastr';
import {reducer as form} from 'redux-form';

const rootReducer = combineReducers({
  user: AuthReducer,
  room: RoomReducer,
  music: MusicReducer,
  toastr: toastrReducer,
  form
});

export default rootReducer;
