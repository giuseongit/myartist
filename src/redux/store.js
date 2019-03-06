import {
  combineReducers
} from 'redux'

export const REDIRECT_URI = 'http://localhost:3000';
export const CLIENT_ID = '1ae47e4ba78d435ca3a3a2fd48f4312d';
export const AUTH_URL = 'https://accounts.spotify.com/authorize?response_type=token&client_id=' + CLIENT_ID + '&redirect_uri=' + REDIRECT_URI;
export const API_URL = 'https://api.spotify.com/v1/';
export const API_ME = API_URL + 'me';

const spotifyApiCall = (url, method, token, payload, success, fail) => {
  fetch(url, {
    method,
    headers: {
      'Authorization': 'Bearer ' + token
    },
    body: payload
  }).then(response => response.json())
  .then(success)
  .catch(fail);
}

const spotifyMe = (token, success, fail) => {
  spotifyApiCall(API_ME, 'GET', token, {}, success, fail)
}

// Action labels
const TOKEN_DETECTED = 'TOKEN_DETECTED';
const TOKEN_ERROR = 'TOKEN_ERROR';
const LOGIN_DATA = 'LOGIN_DATA';

const tokenDetected = (token) => {
  return {
    type: TOKEN_DETECTED,
    token
  }
}

const tokenError = (error) => {
  return {
    type: TOKEN_ERROR,
    error
  }
}

const loginData = (username, id) => {
  return  {
    type: LOGIN_DATA,
    username,
    id
  }
}

// Action creators
export const searchForOauthInfos = (dispatch) => {
  const thisUrl = new URL(window.location.href);
  const token = thisUrl.href.match(/\#(?:access_token)\=([\S\s]*?)\&/);
  const error = thisUrl.searchParams.get("error");
  if (token !== null) {
    dispatch(tokenDetected(token[1]));

    spotifyMe(token[1], data => {
      const { display_name, id } = data;
      dispatch(loginData(display_name, id))
    }, err => {
      console.log(err);
    });

  }else if (error !== null){
    dispatch(tokenError(error));
  }
}

// State init
const initialState = {
  error: false,
  logged: false,
  oauth: null,
  token: null,
  name: null,
}

// Reducers
const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case TOKEN_DETECTED:
      return {
        ...state,
        token: action.token
      };
    case TOKEN_ERROR:
      return {
        ...state,
        error: true
      }
    case LOGIN_DATA:
      const { username, id } = action;
      return {
        ...state,
        logged: true,
        name: username + '(' + id +')'
      }
    default:
      return state;
  }
}

// export const reducers = combineReducers({
//   authReducers
// });

export const reducers = authReducers;