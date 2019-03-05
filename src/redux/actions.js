import {
    LOGIN_ATTEMPT
} from './actionNames';

export const tryLogin = (username, password) => ({
    type: LOGIN_ATTEMPT,
    username,
    password
});