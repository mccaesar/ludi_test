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
