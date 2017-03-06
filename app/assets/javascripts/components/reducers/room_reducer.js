import {GOT_ROOM, GOT_ROOM_LIST, CREATE_INVITATION, DELETE_INVITATION} from '../actions/index'

const INITIAL_STATE = {room_list:[], id: '', name: '', slug:'', dj:{}, users: [], strangers_number: 0};

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case GOT_ROOM:
    return {...state, id: action.payload.data.id, name: action.payload.data.name, slug: action.payload.data.slug, dj: action.payload.data.dj, users: action.payload.data.users}
  case GOT_ROOM_LIST:
    return {...state, room_list:action.payload.data}
  case CREATE_INVITATION:
    if(state.users.some(u => u.id === action.payload.id)){
      return state
    }else{
      return {...state, users:[...state.users, action.payload]}
    }
  case DELETE_INVITATION:
    if (state.users.some(u => u.id === action.payload.id)){
      return {...state, users: state.users.filter((i) => i.id !== action.payload.id)}
    }else{
      return state
    }
  default:
    return state;
  }
}
