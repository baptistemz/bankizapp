import {FETCH_MUSICS, ADD_MUSIC, DELETE_MUSIC, UPDATE_MUSIC, CHANGE_BALANCE, GOT_ROOM, CHANGE_DRAG_ORDER, CHANGE_LIST_ORDER} from '../actions/index'

const INITIAL_STATE = { search_term: '', youtube_auto_complete:[], all:[], music_1: null, music_2: null, balance:0, mute_player:2, waiting_list:[], draggingObject: {}};

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
  case FETCH_MUSICS:
    return {...state, search_term: action.payload.search_term, all: action.payload.videos.data.items}
  case ADD_MUSIC:
    const new_music = action.payload
    const new_music_data = JSON.parse(new_music.json_data)
    switch (new_music.state) {
      case "waiting":
        if(state.waiting_list.length > 0 && state.waiting_list[state.waiting_list.length - 1].etag === new_music_data.etag){
          return state
        }else{
          const extended_list = [...state.waiting_list, new_music_data]
          return {...state, waiting_list: extended_list, draggingObject: {items: extended_list, draggingIndex: null}}
        }
        break;
      case "playing":
        if(state.mute_player === 1){
          return {...state, music_2: new_music_data}
        }else{
          return {...state, music_1: new_music_data}
        }
        break;
      case "next":
        if(state.mute_player === 1){
          return {...state, music_1: new_music_data}
        }else{
          return {...state, music_2: new_music_data}
        }
        break;
      default:
        return state
    }
  case DELETE_MUSIC:
    const music_to_delete_data = JSON.parse(action.payload.json_data)
    if(state.music_1 && state.music_1.etag === music_to_delete_data.etag){
      return {...state, music_1: null}
    }else if(state.music_2 && state.music_2.etag === music_to_delete_data.etag){
      return {...state, music_2: null}
    }else if(state.waiting_list.filter(function(i){return i.id.videoId == music_to_delete_data.id.videoId}).length > 0){
      const reduced_list = state.waiting_list.filter(function(x) { return x.etag != music_to_delete_data.etag})
      return {...state, waiting_list: reduced_list, draggingObject: {items: reduced_list, draggingIndex: null}}
    }else{
      return state
    }
  case UPDATE_MUSIC:
    const updated_music = action.payload
    const updated_music_data = JSON.parse(action.payload.json_data)
    if(updated_music.state === "playing"){
      const new_mute_player = state.mute_player === 1 ? 2 : 1
      return {...state, balance: 0 , mute_player: new_mute_player}
    }else if(updated_music.state === "next"){
      const light_list = $.grep(state.waiting_list, function(e){ return e.etag != updated_music_data.etag; });
      if (state.mute_player === 2){
        return {...state, music_2: updated_music_data, waiting_list: light_list}
      }else{
        return {...state, music_1: updated_music_data, waiting_list: light_list}
      }
    }else if(updated_music.state === "waiting"){
      const augmented_list = state.waiting_list
      augmented_list.unshift(updated_music_data)
      return {...state, music_2: updated_music_data, waiting_list: augmented_list}
    }else{
      return state
    }
  case CHANGE_BALANCE:
    return {...state, balance: action.payload}
  case GOT_ROOM:
    if(action.payload.data.musics.length> 0){
      const playing = $.grep(action.payload.data.musics, function(e){ return e.state == "playing"})[0];
      const next = $.grep(action.payload.data.musics, function(e){ return e.state == "next"})[0];
      const waiting = $.grep(action.payload.data.musics, function(e){ return e.state == "waiting"}).map(function(a) {return JSON.parse(a.json_data);});
      if(state.mute_player === 2){
        return {...state, waiting_list: waiting, music_1: playing ? JSON.parse(playing.json_data) : null, music_2: next ? JSON.parse(next.json_data) : null, draggingObject: {items: waiting, draggingIndex: null}}
      }else{
        return {...state, waiting_list: waiting, music_2: playing ? JSON.parse(playing.json_data) : null, music_1: next ? JSON.parse(next.json_data) : null, draggingObject: {items: waiting, draggingIndex: null}}
      }
    }else{
      return state
    }
  case CHANGE_DRAG_ORDER:
    return {...state, draggingObject: action.payload}
  case CHANGE_LIST_ORDER:
    const music_list = action.payload.map(function(a) {return JSON.parse(a.json_data)});
    if(music_list == state.waiting_list){
      return state
    }else{
      const next_music = (state.playing === 1) ? state.music_2 : state.music_1
      if(music_list[0] === next_music){
        return {...state, waiting_list: music_list}
      }else{
        if(state.mute_player === 2){
          return {...state, music_2: music_list[0], waiting_list: music_list}
        }else{
          return {...state, music_1: music_list[0], waiting_list: music_list}
        }
      }
    }
  default:
    return state;
  }
}
