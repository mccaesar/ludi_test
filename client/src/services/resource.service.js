import axios from 'axios';
import qs from 'qs';
import { API_URL } from '../config';

export const getResources = async () => {
  return await axios.get(`${API_URL}/resources`);
};

export const getResourceByRID = async (resourceId) => {
  const userId = localStorage.getItem('user_id');
  return await axios
    .get(`${API_URL}/resource/${resourceId}/${userId}`)
    .then((res) => res.data);
};

export const getSavedResourceIds = async () => {
  const userId = localStorage.getItem('user_id');
  return await axios.get(`${API_URL}/saved/${userId}`).then((res) => res.data);
};

export const saveResource = async (resourceId) => {
  const userId = localStorage.getItem('user_id');
  const data = { userId: userId };
  return await axios.patch(
    `${API_URL}/resource/${resourceId}/save`,
    qs.stringify(data)
  );
};

export const unsaveResource = async (resourceId) => {
  const userId = localStorage.getItem('user_id');
  const data = { userId: userId };
  return await axios.patch(
    `${API_URL}/resource/${resourceId}/unsave`,
    qs.stringify(data)
  );
};
