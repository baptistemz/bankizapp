import {combineReducers} from 'redux';
import MusicReducer from './music_reducer';
import RoomReducer from './room_reducer';

const rootReducer = combineReducers({
  room: RoomReducer,
  music: MusicReducer
});

export default rootReducer;
