import axios from 'axios';
import qs from 'qs';
import { addDays, isBefore } from 'date-fns';

import { API_URL } from '../config';

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
  const expiresAt = addDays(new Date(), expiresIn[0]);
  localStorage.setItem('user_id', responseObj.user._id);
  localStorage.setItem('id_token', responseObj.token);
  localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
};

const getExpiration = () => {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date(expiresAt);
};

export const getLoginStatus = () => {
  const token = localStorage.getItem('id_token');
  if (token) {
    const loggedIn = isBefore(new Date(), getExpiration());
    return loggedIn;
  }
  return false;
};

export const registerUser = async (data) => {
  return await axios
    .post(`${API_URL}/register`, qs.stringify(data))
    .catch((err) => {
      console.log(err);
    });
};

export const loginUser = async (data) => {
  return await axios
    .post(`${API_URL}/login`, qs.stringify(data))
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
