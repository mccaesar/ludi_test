import axios from 'axios';
import { API_URI } from '../config';
import { authApis } from '.';

export const getUser = async () => {
  if (authApis.isLoggedIn()) {
    return await axios
      .get(`${API_URI}/user`)
      .then(({ data }) => data)
      .catch((err) => console.error(err));
  }
  return null;
};
