import {GOT_ROOM, GOT_ROOM_LIST} from '../actions/index'

const INITIAL_STATE = {room_list:[], id: '', name: '', slug:'', dj:{}, users: []};

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case GOT_ROOM:
    return {...state, id: action.payload.data.id, name: action.payload.data.name, slug: action.payload.data.slug, dj: action.payload.data.dj}
  case GOT_ROOM_LIST:
    return {...state, room_list:action.payload.data}
  default:
    return state;
  }
}
