import axios from 'axios';
import qs from 'qs';

import { url } from '.';

export const getResources = async () => {
  return await axios.get(`${url}/resources`);
};

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

export const saveResource = async (resourceId) => {
  const userId = localStorage.getItem('user_id');
  const data = { userId: userId };
  console.log(data);
  return await axios.patch(
    `${url}/resource/${resourceId}/save`,
    qs.stringify(data)
  );
};

export const unsaveResource = async (resourceId) => {
  const userId = localStorage.getItem('user_id');
  const data = { userId: userId };
  return await axios.patch(
    `${url}/resource/${resourceId}/unsave`,
    qs.stringify(data)
  );
};
