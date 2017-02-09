import {FETCH_MUSICS, PLAY_MUSIC_ON_PLAYER_1, PLAY_MUSIC_ON_PLAYER_2, PLAY_NEXT, STOP_PLAYER, ADD_TO_WAITING_LIST, DELETE_FROM_WAITING_LIST, SWITCH_PLAYERS, CHANGE_BALANCE, GOT_ROOM, CHANGE_DRAG_ORDER, CHANGE_LIST_ORDER} from '../actions/index'

const INITIAL_STATE = { search_term: '', youtube_auto_complete:[], all:[], music_1: null, music_2: null, balance:0, next_player: 1, mute_player:2, waiting_list:[], draggingObject: {}};

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case FETCH_MUSICS:
    return {...state, search_term: action.payload.search_term, all: action.payload.videos.data.items}
  case PLAY_MUSIC_ON_PLAYER_1:
    return {...state, music_1: action.payload.music, next_player: 2}
  case PLAY_MUSIC_ON_PLAYER_2:
    return {...state, music_2: action.payload.music, next_player: 1}
  case ADD_TO_WAITING_LIST:
    const new_music = JSON.parse(action.payload.json_data)
    if(state.waiting_list[state.waiting_list.length - 1].etag === JSON.parse(action.payload.json_data).etag){
      return state
    }else{
      const extended_list = [...state.waiting_list, JSON.parse(action.payload.json_data)]
      console.log("from reducer")
      return {...state, waiting_list: extended_list, draggingObject: {items: extended_list, draggingIndex: null}}
    }
  case DELETE_FROM_WAITING_LIST:
    const to_delete = JSON.parse(action.payload.data.json_data)
    const reduced_list = state.waiting_list.filter(function(x) { return x.etag != to_delete.etag})
    const next = (state.next_player === 1) ? state.music_2 : state.music_1
    if(to_delete.etag === next.etag){
      if(state.next_player === 1){
        return {...state, music_2: reduced_list[0], waiting_list: reduced_list, draggingObject: {items: reduced_list, draggingIndex: null}}
      }else{
        return {...state, music_1: reduced_list[0], waiting_list: reduced_list, draggingObject: {items: reduced_list, draggingIndex: null}}
      }
    }else{
      return {...state, waiting_list: reduced_list, draggingObject: {items: reduced_list, draggingIndex: null}}
    }
  case CHANGE_BALANCE:
    return {...state, balance: action.payload}
  case PLAY_NEXT:
    const list = state.waiting_list
    if((list[0] === state.music_1)||(list[0] === state.music_2)){
      list.shift()
    }
    const music = state.waiting_list[0]
    if (action.payload === 1){
      return {...state, music_1: music}
    }else{
      return {...state, music_2: music}
    }
  case STOP_PLAYER:
    if (action.payload === 1){
      return {...state, music_1: null}
    }else{
      return {...state, music_2: null}
    }
  case SWITCH_PLAYERS:
    if (action.payload.old_player === 1){
      return {...state, music_1: null, next_player:2, balance: 0, mute_player:1}
    }else{
      return {...state, music_2: null, next_player:1, balance: 0, mute_player:2}
    }
  case GOT_ROOM:
    if(action.payload.data.musics.length > 0){
      const playing = JSON.parse($.grep(action.payload.data.musics, function(e){ return e.state == "playing"; })[0].json_data);
      const waiting = $.grep(action.payload.data.musics, function(e){ return e.state == "waiting"; }).map(function(a) {return JSON.parse(a.json_data);});
      if(state.mute_player === 2){
        return {...state, waiting_list: waiting, music_1: playing, music_2: waiting[0], draggingObject: {items: waiting, draggingIndex: null}}
      }else{
        return {...state, waiting_list: waiting, music_2: playing, music_1: waiting[0], draggingObject: {items: waiting, draggingIndex: null}}
      }
    }else{
      return state
    }
  case CHANGE_DRAG_ORDER:
    return {...state, draggingObject: action.payload}
  case CHANGE_LIST_ORDER:
    const music_list = action.payload.data.map(function(a) {return JSON.parse(a.json_data)});
    const next_music = (state.playing === 1) ? state.music_2 : state.music_1
    if(music_list[0] === next_music){
      return {...state, waiting_list: music_list}
    }else{
      if(state.next_player === 1){
        return {...state, music_2: music_list[0], waiting_list: music_list}
      }else{
        return {...state, music_1: music_list[0], waiting_list: music_list}
      }
    }
  default:
    return state;
  }

}
