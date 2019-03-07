import { spotifyMe, sporitfySearchArtists } from './api';
import { combineReducers } from 'redux';

// Action labels
const TOKEN_DETECTED = 'TOKEN_DETECTED';
const TOKEN_ERROR = 'TOKEN_ERROR';
const LOGIN_DATA = 'LOGIN_DATA';
const SEARCH_END = 'SEARCH_END';
const SAVE_TO_FAV = 'SAVE_TO_FAV';
const DELETE_FROM_FAV = 'DELETE_FROM_FAV';

const tokenDetected = (token) => {
  return {
    type: TOKEN_DETECTED,
    token
  };
}

const tokenError = (error) => {
  return {
    type: TOKEN_ERROR,
    error
  };
}

const loginData = (username, id) => {
  return  {
    type: LOGIN_DATA,
    username,
    id
  };
}

const searchEnd = (artists) => {
  return {
    type: SEARCH_END,
    artists
  };
}

const saveToFav = (artist) => {
  return {
    type: SAVE_TO_FAV,
    artist
  };
}

const deleteFromFav = (artist) => {
 return {
   type: DELETE_FROM_FAV,
   artist
 };
}

// Action creators
export const searchForOauthInfos = (dispatch) => {
  const thisUrl = new URL(window.location.href);
  const token = thisUrl.href.match(/\#(?:access_token)\=([\S\s]*?)\&/); // eslint-disable-line no-useless-escape
  const error = thisUrl.searchParams.get("error");
  if (token !== null) {
    dispatch(tokenDetected(token[1]));

    spotifyMe(token[1])
    .then(data => {
      const { display_name, id } = data;
      dispatch(loginData(display_name, id));
    }).catch(err => {
      console.log(err);
    });

  }else if (error !== null){
    dispatch(tokenError(error));
  }
}

export const searchArtist = (dispatch, token, query) => {
  sporitfySearchArtists(token, query)
  .then(data => {
    const { items } = data.artists;
    dispatch(searchEnd(items));
  }).catch(err => {
    console.log(err);
  });
}

export const handleArtist = (dispatch, action, artist) => {
  switch(action){
    case 'add':
      dispatch(saveToFav(artist));
    case 'remove':
      dispatch(deleteFromFav(artist));
    default:
      return;
  }
}


// State init
const auth = {
  error: false,
  logged: false,
  oauth: null,
  token: null,
  name: null,
}

const artists = {
  cache: [],
  favs: []
}


// Reducers
const authReducer = (state = auth, action) => {
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
      };
    case LOGIN_DATA:
      const { username, id } = action;
      return {
        ...state,
        logged: true,
        name: username + '(' + id +')'
      };
    default:
      return state;
  }
}

const artistsReducer = (state = artists, action) => {
  switch (action.type){
    case SEARCH_END:
      return {
        ...state,
        cache: action.artists
      }
    case SAVE_TO_FAV:
      return {
        ...state,
        favs: [...state.favs, action.artist]
      }
    case DELETE_FROM_FAV:
      return {
        ...state,
        favs: state.favs.filter((fav) => fav.id !== action.artist.id)
      }
    default:
      return state;
  }
}

export const reducer = combineReducers({
  auth: authReducer,
  artists: artistsReducer
});