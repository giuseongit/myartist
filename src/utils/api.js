export const REDIRECT_URI = window.location.href.slice(0,-1); // Remove last character (/) for using as redirect URI with spotify
export const CLIENT_ID = '1ae47e4ba78d435ca3a3a2fd48f4312d';
export const AUTH_URL = 'https://accounts.spotify.com/authorize?response_type=token&client_id=' + CLIENT_ID + '&redirect_uri=' + REDIRECT_URI;
export const API_URL = 'https://api.spotify.com/v1/';
export const API_ME = API_URL + 'me';
export const API_SEARCH = API_URL + 'search';

const spotifyApiCall = (url, method, token, payload, success, fail) => {
  let options = {
    method,
    headers: {
      'Authorization': 'Bearer ' + token
    }
  };

  if(method === 'POST'){
    options.body = payload;
  }else if(method === 'GET'){
    const queryobj = new URLSearchParams(payload)
    const querystr = queryobj.toString()
    url += '?' + querystr
  }
  
  fetch(url, options).then(response => response.json())
  .then(success)
  .catch(fail);
}

export const spotifyMe = (token, success, fail) => {
  spotifyApiCall(API_ME, 'GET', token, null, success, fail);
}

export const sporitfySearchArtists = (token, query, success, fail) => {
  const req_body = {
    q: query,
    type: 'artist'
  };
  spotifyApiCall(API_ME, 'GET', token, req_body, success, fail);
}