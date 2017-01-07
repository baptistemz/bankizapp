import axios from 'axios';
import YTSearch from 'youtube-api-search';
import moment from 'moment';
import { browserHistory } from 'react-router'

const API_KEY = 'AIzaSyDaosxESYbzNrFkJ1vEXL3H7XiNGGEwAUM';
const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

export const FETCH_MUSICS = "FETCH_MUSICS";
export const PLAY_MUSIC_ON_PLAYER_1 = "PLAY_MUSIC_ON_PLAYER_1";
export const PLAY_MUSIC_ON_PLAYER_2 = "PLAY_MUSIC_ON_PLAYER_2";
export const CHANGE_BALANCE = "CHANGE_BALANCE";
export const PLAY_NEXT = "PLAY_NEXT";
export const START_PLAYER = "START_PLAYER";
export const STOP_PLAYER = "STOP_PLAYER";
export const ADD_TO_WAITING_LIST = "ADD_TO_WAITING_LIST";
export const DELETE_FROM_WAITING_LIST = "DELETE_FROM_WAITING_LIST";
export const SWITCH_PLAYERS = "SWITCH_PLAYERS";
export const GOT_ROOM ='GOT_ROOM'
export const CHANGE_DRAG_ORDER ='CHANGE_DRAG_ORDER'
export const CHANGE_LIST_ORDER ='CHANGE_LIST_ORDER'


export function fetchMusics(term){
  var params = {
    part: 'snippet',
    key: API_KEY,
    q: term,
    type: 'video',
    maxResults: 12
  };
  const request1 = axios.get(ROOT_URL, { params: params })
  return(dispatch) => {
    request1.then(function(data) {
      const ids = data.data.items.map(function(i){return i.id.videoId}).join("%2C")
      const duration_url = `https://www.googleapis.com/youtube/v3/videos?id=${ids}&part=contentDetails&key=${API_KEY}`
      const request2 = axios.get(duration_url)
      request2.then(function(details) {
        let count = 0
        data.data.items.map(function(i){
          i['duration'] = moment.duration(details.data.items[count].contentDetails.duration).humanize()
          count+=1
        })
        dispatch({type: FETCH_MUSICS, payload: {search_term:term, videos:data}})
      })
    });
  }
}

export function playMusic(player, music){
  return(dispatch) => {
    if (player===1) {
      dispatch({type: PLAY_MUSIC_ON_PLAYER_1, payload: {player:player, music:music}})
    }else{
      dispatch({type: PLAY_MUSIC_ON_PLAYER_2, payload: {player:player, music:music}})
    }
  }
}
export function addToWaitingList(room_id, music){
  const post_url = `/api/v0/rooms/${room_id}/musics`
  const request = axios.post(post_url, {
    json_data: JSON.stringify(music),
    state: "waiting"
  })
  return(dispatch) => {
    request.then(function(data){
      dispatch({type: ADD_TO_WAITING_LIST, payload:data})
    })
  }
}
export function deleteFromWaitingList(music){
  // const delete_url  =`api/v0/rooms/${room_id}/musics`
  // const request = axios.delete(post_url, {
  //   json_data: JSON.stringify(music),
  //   state: "waiting"
  // })
  return(dispatch) => {
    dispatch({type: DELETE_FROM_WAITING_LIST, payload: music})
  }
}
export function changeBalance(balance){
  return(dispatch) => {
    dispatch({type: CHANGE_BALANCE, payload: balance})
  }
}
export function playNext(player){
  return(dispatch) => {
    dispatch({type: PLAY_NEXT, payload: player})
  }
}
export function startPlayer(player){
  return(dispatch) => {
    dispatch({type: START_PLAYER, payload: player})
  }
}
export function stopPlayer(player){
  return(dispatch) => {
    dispatch({type: STOP_PLAYER, payload: player})
  }
}
export function switchPlayers(old_player){
  return(dispatch) => {
    dispatch({type: SWITCH_PLAYERS, payload:{old_player:old_player}})
  }
}
export function createRoom(name){
  const post_url = '/api/v0/rooms'
  const request = axios.post(post_url, {
    name: name,
    slug: name
  })
  return(dispatch) => {
    request.then(function(data){
      dispatch({type: GOT_ROOM, payload:data})
      browserHistory.push(`/rooms/${name}`)
    })
  }
}
export function fetchRoom(name){
  const get_url = `/api/v0/rooms/${name}`
  const request = axios.get(get_url)
  return(dispatch) => {
    request.then(function(data){
      dispatch({type: GOT_ROOM, payload:data})
    })
  }
}
export function changeDragOrder(obj){
  return(dispatch) => {
    dispatch({type: CHANGE_DRAG_ORDER, payload:obj})
  }
}
export function printListOrder(name, list){
  const post_url = `/api/v0/rooms/${name}/modify_waiting_list`
  const request = axios.post(post_url, {
    list: list
  })
  return(dispatch) => {
    request.then(function(data){
      dispatch({type: CHANGE_LIST_ORDER, payload:data})
    })
  }
}
