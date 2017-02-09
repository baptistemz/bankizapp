import axios from 'axios';
import YTSearch from 'youtube-api-search';
import moment from 'moment';
import { browserHistory } from 'react-router'
import slugify from '../slugify'
import {toastr} from 'react-redux-toastr'

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

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS'
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'


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
export function addToWaitingList(room_id, music, state){
  const post_url = `/api/v0/rooms/${room_id}/musics`
  const request = axios.post(post_url, {
    json_data: JSON.stringify(music),
    state: state,
    slug: slugify(music.etag.substr(music.etag.length - 10))
  })
  return(dispatch) => {
    request.then(function(data){
      dispatch({type: ADD_TO_WAITING_LIST, payload:data.data})
    })
  }
}
export function receiveAddedMusic(data){
  return(dispatch) => {
    dispatch({type: ADD_TO_WAITING_LIST, payload:data.music})
  }
}
export function deleteFromWaitingList(room_id, music){
  const delete_url  =`/api/v0/rooms/${room_id}/musics/${slugify(music.etag.substr(music.etag.length - 10))}`
  const request = axios.delete(delete_url)
  return(dispatch) => {
    request.then(function(data){
      dispatch({type: DELETE_FROM_WAITING_LIST, payload: data.data})
    })
  }
}
export function receiveDeletedMusic(data){
  return(dispatch) => {
    dispatch({type: DELETE_FROM_WAITING_LIST, payload:data.music})
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
export function createRoom(name, slug){
  const token = localStorage.getItem('auth_token')
  const post_url = '/api/v0/rooms'
  const request = axios.post(post_url, {
   room:{
     name: name,
     slug: slug
   }
  },{
    headers: {
      "Authorization": "Bearer "+ token,
      "Content-Type": "application/json"
   }
  })
  return(dispatch) => {
    request.then(function(data){
      dispatch({type: GOT_ROOM, payload:data})
      browserHistory.push(`/rooms/${slug}`)
    })
  }
}
export function fetchRoom(name){
  const token = localStorage.getItem('auth_token')
  const get_url = `/api/v0/rooms/${name}`
  const request = axios.get(get_url,{
    headers: {
      "Authorization": "Bearer "+ token,
      "Content-Type": "application/json"
   }
  })
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

// AUTH

// Auth different states

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user: user
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function requestSignup(creds) {
  return {
    type: SIGNUP_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveSignup(user) {
  return {
    type: SIGNUP_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user: user
  }
}

function signupError(message) {
  return {
    type: SIGNUP_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Auth different actions

export function loginUser(creds, current_room) {
  console.log(1, 'in login', creds, current_room)
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}`
  }
  return dispatch => {
    console.log(2, 'in dispatch')
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    return fetch('/api/v0/auth_user', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          console.log(3, 'in response, not ok')
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
          console.log(3, "in response, it's ok")
          // If login was successful, set the token in local storage
          localStorage.setItem('auth_token', user.auth_token)
          localStorage.setItem('email', user.user.email)
          localStorage.setItem('username', user.user.username)
          // Dispatch the success action
          dispatch(receiveLogin(user))
          toastr.success('Logged in with success', `as ${user.user.username}`)
          current_room ? browserHistory.push(`/rooms/${current_room}`) : browserHistory.push('/')
        }
      }).catch(err => toastr.error('could not connect you' , `${err.errors[0]}`))
  }
}
export function signupUser(creds, current_room) {
  const post_url = '/api/v0/users'
  const params = {user:{
    username: creds.username,
    email: creds.email,
    password: creds.password,
    password_confirmation: creds.password_confirmation
  }}
  return dispatch => {
    dispatch(requestSignup(creds))
    return axios.post(post_url, params)
      .then(response => {
        if (response.errors) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(signupError(user.message))
          return Promise.reject(user)
        } else {
          dispatch(loginUser({ email: creds.email, password: creds.password }, current_room))
        }
      }).catch(err => toastr.error(`Couldn't create your account`), {timeOut: 30000})
  }
      //
};

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('auth_token')
    localStorage.removeItem('email')
    localStorage.removeItem('username')
    dispatch(receiveLogout())
    toastr.success('Logged out successfully', 'Hope to see you soon !')
  }
}
