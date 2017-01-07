import {GOT_ROOM} from '../actions/index'

const INITIAL_STATE = {id: '',name: '', dj:{}, users: []};

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case GOT_ROOM:
    return {...state, id: action.payload.data.id, name: action.payload.data.name}
  default:
    return state;
  }
}
