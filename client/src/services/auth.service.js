import axios from 'axios';
import qs from 'qs';
import { addDays, isBefore } from 'date-fns';
import { API_URI } from '../config';
import moment from "moment/moment";

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
  //const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
  const expiresAt = localStorage.getItem('expires_at');
  return new Date(expiresAt);
};

export const isLoggedIn = () => {
  const token = localStorage.getItem('id_token');
  if (token) {
    const loggedIn = isBefore(new Date(), getExpiration());
    axios.defaults.headers.common['Authorization'] = token;
    return loggedIn;
  }
  return false;
};

export const registerUser = async (data) => {
  return await axios
    .post(`${API_URI}/register`, qs.stringify(data))
    .then(({ data }) => {
      setLocalStorage(data);
        const expiresIn = data.expiresIn;
        const expiresInAmount = Number(expiresIn.match(/\d+/)[0]);
        const expiresInUnit = expiresIn.match(/[a-zA-Z]+/)[0];
        localStorage.setItem('loginData', JSON.stringify(data));
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('expires_at', moment().add(expiresInAmount, expiresInUnit).toDate().toString());

    })
    .catch((err) => {
      throw err;
    });
};

export const loginUser = async (data) => {
  return await axios
    .post(`${API_URI}/login`, qs.stringify(data))
    .then(({ data }) => {
      setLocalStorage(data);
      const expiresIn = data.expiresIn;
      const expiresInAmount = Number(expiresIn.match(/\d+/)[0]);
      const expiresInUnit = expiresIn.match(/[a-zA-Z]+/)[0];
      localStorage.setItem('loginData', JSON.stringify(data));
      localStorage.setItem('id_token', data.token);
      localStorage.setItem('expires_at', moment().add(expiresInAmount, expiresInUnit).toDate().toString());

    })
    .catch((err) => {
      throw err;
    });
};

export const logoutUser = () => {
  localStorage.removeItem('id_token');
  localStorage.removeItem('expires_at');
};


// ------------- RESET PASSWORD -----------------------------------

export const requestPassword = async (data) => {
  console.log("AJAX confrim")
  return await axios
    .post(`${API_URI}/password/reset`, qs.stringify(data))
    .then(({ data }) => {
      console.log("SUCCESS")
    })
    .catch((err) => {
      throw err;
    });
};



export const resetPassword = async (data) => {
  return await axios
    .post(`${API_URI}/password/reset/done`, qs.stringify(data))
    .then(({ data }) => {
      console.log("SUCCESS")
    })
    .catch((err) => {
      throw err;
    });
};

