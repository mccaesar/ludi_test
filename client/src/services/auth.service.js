import axios from 'axios';
import qs from 'qs';
import { addDays, isBefore } from 'date-fns';
import { API_URI } from '../config';

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
  localStorage.setItem('id_token', responseObj.token);
  localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
};

const getExpiration = () => {
  const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  return new Date(expiresAt);
};

export const isLoggedIn = () => {
  const token = localStorage.getItem('id_token');
  if (token) {
    const loggedIn = isBefore(new Date(), getExpiration());
    return loggedIn;
  }
  return false;
};

export const registerUser = async (data) => {
  return await axios
    .post(`${API_URI}/register`, qs.stringify(data))
    .then(({ data }) => {
      setLocalStorage(data);
    })
    .catch((err) => console.error(err));
};

export const loginUser = async (data) => {
  return await axios
    .post(`${API_URI}/login`, qs.stringify(data))
    .then(({ data }) => {
      setLocalStorage(data);
    })
    .catch((err) => console.error(err));
};

export const logoutUser = () => {
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
};
