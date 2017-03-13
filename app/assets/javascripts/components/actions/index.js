import axios from 'axios';
import YTSearch from 'youtube-api-search';
import moment from 'moment';
import { browserHistory } from 'react-router'
import slugify from '../slugify'
import {toastr} from 'react-redux-toastr'

const API_KEY = 'AIzaSyDaosxESYbzNrFkJ1vEXL3H7XiNGGEwAUM';
const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

export const FETCH_MUSICS = "FETCH_MUSICS";
export const CHANGE_BALANCE = "CHANGE_BALANCE";
export const ADD_MUSIC = "ADD_MUSIC";
export const UPDATE_MUSIC = "UPDATE_MUSIC";
export const DELETE_MUSIC = "DELETE_MUSIC";
export const GOT_ROOM ='GOT_ROOM'
export const GOT_ROOM_LIST ='GOT_ROOM_LIST'
export const CHANGE_DRAG_ORDER ='CHANGE_DRAG_ORDER'
export const CHANGE_LIST_ORDER ='CHANGE_LIST_ORDER'
export const CREATE_INVITATION ='CREATE_INVITATION'
export const DELETE_INVITATION ='DELETE_INVITATION'
export const STRANGERS_NUMBER_CHANGED ='STRANGERS_NUMBER_CHANGED'

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
export function addMusic(room_id, music, state){
  const post_url = `/api/v0/rooms/${room_id}/musics`
  const request = axios.post(post_url, {
    json_data: JSON.stringify(music),
    state: state,
    slug: slugify(music.etag.substr(music.etag.length - 10))
  })
  return(dispatch) => {
    request.then(function(data){
      dispatch({type: ADD_MUSIC, payload:data.data})
    })
  }
}
export function receiveAddedMusic(data){
  return(dispatch) => {
    dispatch({type: ADD_MUSIC, payload:data.music})
  }
}
export function deleteMusic(music, room_id){
  const delete_url  =`/api/v0/rooms/${room_id}/musics/${slugify(music.etag.substr(music.etag.length - 10))}`
  const request = axios.delete(delete_url)
  return(dispatch) => {
    request.then(function(data){
      dispatch({type: DELETE_MUSIC, payload: data.data})
    })
  }
}
export function receiveUpdatedMusic(data){
  return(dispatch) => {
    dispatch({type: UPDATE_MUSIC, payload:data.music})
  }
}
export function receiveDeletedMusic(data){
  return(dispatch) => {
    dispatch({type: DELETE_MUSIC, payload:data.music})
  }
}
export function changeBalance(balance){
  return(dispatch) => {
    dispatch({type: CHANGE_BALANCE, payload: balance})
  }
}
export function createRoom(name, slug){
  const token = localStorage.getItem('auth_token')
  const post_url = '/api/v0/rooms'
  const data = {room:{
     name: name,
     slug: slug,
     strangers_number:0
  }}
  const config = {headers: {
      "Authorization": "Bearer "+ token,
      "Content-Type": "application/json"
  }}
  const request = axios.post(post_url, data, config);
  return(dispatch) => {
    request.then(function(response){
      dispatch({type: GOT_ROOM, payload:response})
      browserHistory.push(`/rooms/${slug}`)
    }).catch(function (error) {
      toastr.error(`${error.response.data.errors[0]}`, {timeOut: 8000});
      if(error.response.status === 401){
        browserHistory.push('/login');
      }
    });
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
export function fetchRoomList(){
  const token = localStorage.getItem('auth_token')
  const get_url = 'api/v0/rooms'
  const config = {headers: {
      "Authorization": "Bearer "+ token,
      "Content-Type": "application/json"
   }}
  const request = axios.get(get_url, config)
  return(dispatch) => {
    request.then(function(data){
      dispatch({type: GOT_ROOM_LIST, payload:data})
    }).catch(function (error) {
      const error_message = error.response ?`${error.response.data.errors[0]}`:'error';
      toastr.error(error_message, {timeOut: 8000});
      if(error.response){
        if(error.response.status === 401){
          browserHistory.push('/login');
        }
      }
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
      dispatch({type: CHANGE_LIST_ORDER, payload:data.data})
    })
  }
}
export function receiveSortedMusics(data){
  return(dispatch) => {
    dispatch({type: CHANGE_LIST_ORDER, payload:data.musics})
  }
}
export function connectToRoom(room_slug){
  const token = localStorage.getItem('auth_token')
  if (token){
    const post_url = `/api/v0/rooms/${room_slug}/invitations`
    const config = {headers: {
      "Authorization": "Bearer "+ token,
      "Content-Type": "application/json"
    }}
    const request = axios.post(post_url, {invitation:{active: true}}, config)
    return(dispatch) => {
      request.then(function(data){
        dispatch({type: CREATE_INVITATION, payload:data.data})
      })
    }
  }else{
    const request = axios.post(`/api/v0/rooms/${room_slug}/increment_strangers_number`)
    return(dispatch) => {
      request.then(function(data){
        dispatch({type: CREATE_INVITATION, payload:data.data})
      })
    }
  }
}
export function receiveNewInvitation(data){
  return(dispatch) => {
    dispatch({type: CREATE_INVITATION, payload:data.invitation})
  }
}

export function disconnectFromRoom(room_slug, invitation_id){
  const token = localStorage.getItem('auth_token')
  if(token){
    const put_url = `/api/v0/rooms/${room_slug}/invitations/${invitation_id}`
    const config = {headers: {
      "Authorization": "Bearer "+ token,
      "Content-Type": "application/json"
    }}
    const request = axios.put(put_url, {invitation:{active: false}}, config)
    return(dispatch) => {
      request.then(function(data){
        dispatch({type: DELETE_INVITATION, payload:data.data})
      })
    }
  }else{
    const request = axios.post(`/api/v0/rooms/${room_slug}/decrement_strangers_number`)
    return(dispatch) => {
      request.then(function(data){
        dispatch({type: DELETE_INVITATION, payload:data.data})
      })
    }
  }
}
export function receiveDeletedInvitation(data){
  return(dispatch) => {
    dispatch({type: DELETE_INVITATION, payload:data.invitation})
  }
}
export function strangersNumberChanged(data){
  return(dispatch) => {
    dispatch({type: STRANGERS_NUMBER_CHANGED, payload:data})
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
  const post_url = '/api/v0/auth_user'
  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}`
  }
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))
    return fetch( post_url, config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message))
          return Promise.reject(user)
        } else {
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
      }).catch(function (error) {
        error.response.data.errors.forEach(function(e){
          toastr.error(`${e}`, {timeOut: 10000});
        });
      });
  };
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
