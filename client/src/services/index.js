import axios from 'axios';
import qs from 'qs';

const url = 'http://localhost:5000';

export const getResources = () => axios.get(`${url}/resources`);
export const postRegister = (data) => {
  axios.post(`${url}/register`, qs.stringify(data)).catch((err) => {
    console.log(err);
  });
};
export const postLogin = (data) => {
  axios.post(`${url}/login`, qs.stringify(data)).catch((err) => {
    console.log(err);
  });
};
