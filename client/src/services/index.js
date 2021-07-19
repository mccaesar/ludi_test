import axios from 'axios';
import qs from 'qs';
import moment from 'moment';

const url = 'http://localhost:5000';

(function authInterceptor() {
  const token = localStorage.getItem('id_token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    axios.defaults.headers.common['Authorization'] = null;
  }
})();

export const getResources = () => axios.get(`${url}/resources`);

export const getResourceByRID = async (resourceId) => {
  const userId = localStorage.getItem('user_id');
  return await axios
    .get(`${url}/resource/${resourceId}/${userId}`)
    .then((res) => res.data);
};

export const getSavedResourceIds = async () => {
  const userId = localStorage.getItem('user_id');
  return await axios.get(`${url}/saved/${userId}`).then((res) => res.data);
};

export const getUser = async () => {
  const userId = localStorage.getItem('user_id');
  return await axios.get(`${url}/user/${userId}`).then((res) => res.data);
};

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

export const registerUser = (data) => {
  axios.post(`${url}/register`, qs.stringify(data)).catch((err) => {
    console.log(err);
  });
};

export const loginUser = (data) => {
  axios
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

export const isLoggedIn = () => {
  const token = localStorage.getItem('id_token');
  if (token) {
    const loggedIn = moment().isBefore(getExpiration());
    return loggedIn;
  }
  return false;
};

export const isLoggedOut = () => {
  return !isLoggedIn();
};

export const saveResource = (resourceId) => {
  const userId = localStorage.getItem('user_id');
  const data = { userId: userId };
  axios
    .patch(`${url}/resource/${resourceId}/save`, qs.stringify(data))
    .then((res) => console.log(res));
};

export const unsaveResource = (resourceId) => {
  const userId = localStorage.getItem('user_id');
  const data = { userId: userId };
  axios
    .patch(`${url}/resource/${resourceId}/unsave`, qs.stringify(data))
    .then((res) => console.log(res));
};
