import axios from 'axios';
import qs from 'qs';
import moment from 'moment';

import { url } from '.';

(function authInterceptor() {
  const token = localStorage.getItem('id_token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
  }
})();

const setLocalStorage = (responseObj) => {
  const expiresIn = responseObj.expiresIn.split(/(\d+)/).filter(Boolean);
  const expires = moment().add(expiresIn[0], expiresIn[1]);
  localStorage.setItem('user_id', responseObj.user._id);
  localStorage.setItem('id_token', responseObj.token);
  localStorage.setItem('expires_at', JSON.stringify(expires.valueOf()));
};

const getExpiration = () => {
  const expiration = localStorage.getItem('expires_at');
  const expiresAt = JSON.parse(expiration);
  return moment(expiresAt);
};

export const getLoginStatus = () => {
  const token = localStorage.getItem('id_token');
  if (token) {
    const loggedIn = moment().isBefore(getExpiration());
    return loggedIn;
  }
  return false;
};

export const registerUser = async (data) => {
  return await axios
    .post(`${url}/register`, qs.stringify(data))
    .catch((err) => {
      console.log(err);
    });
};

export const loginUser = async (data) => {
  return await axios
    .post(`${url}/login`, qs.stringify(data))
    .then((res) => {
      setLocalStorage(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const logoutUser = () => {
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
  localStorage.removeItem('user_id');
};
