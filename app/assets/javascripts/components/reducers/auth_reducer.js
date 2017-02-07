import {LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT_SUCCESS} from '../actions/index'

const INITIAL_STATE = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('auth_token') ? true : false,
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email")
  };

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds.email
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        username: action.user.user.username,
        email: action.user.user.email,
        errorMessage: ''
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case SIGNUP_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds.email
      })
    case SIGNUP_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        username: action.user.user.username,
        email: action.user.user.email,
        errorMessage: ''
      })
    case SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      })
    default:
      return state
  }
}
