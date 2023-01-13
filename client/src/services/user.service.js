import axios from 'axios';
import { API_URI } from '../config';
import { authApi } from '.';

export const getUser = async () => {
  if (authApi.isLoggedIn()) {
    return await axios
      .get(`${API_URI}/user`)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }
  return null;
};

export const getActiveUser = async () => {
  return await axios
    .get(`${API_URI}/active-users`)
    .then(({ data }) => data)
    .catch((err) => console.error(err));
};

export const getProfessionalUsers = async () => {
  return await axios
    .get(`${API_URI}/professional-users`)
    .then(({ data }) => data)
    .catch((err) => console.error(err));
};

export const getUserById = async (id) => {
  return await axios
    .get(`${API_URI}/user/${id}`)
    .then(({ data }) => data)
    .catch((err) => console.error(err));
};
