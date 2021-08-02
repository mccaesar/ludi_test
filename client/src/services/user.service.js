import axios from 'axios';
import { API_URL } from '../config';

export const getUser = async () => {
  const userId = localStorage.getItem('user_id');
  if (userId) {
    return await axios.get(`${API_URL}/user/${userId}`).then((res) => res.data);
  }
  return null;
};
