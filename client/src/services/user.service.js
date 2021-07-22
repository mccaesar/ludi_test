import axios from 'axios';

import { url } from '.';

export const getUser = async () => {
  const userId = localStorage.getItem('user_id');
  if (userId) {
    return await axios.get(`${url}/user/${userId}`).then((res) => res.data);
  }
  return null;
};
