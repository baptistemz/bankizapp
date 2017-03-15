import {combineReducers} from 'redux';
import {reducer as toastrReducer} from 'react-redux-toastr';
import AuthReducer from './auth_reducer';
import MusicReducer from './music_reducer';
import RoomReducer from './room_reducer';

const rootReducer = combineReducers({
  user: AuthReducer,
  room: RoomReducer,
  music: MusicReducer,
  toastr: toastrReducer,
});

export default rootReducer;
