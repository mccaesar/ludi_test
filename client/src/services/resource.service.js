import axios from 'axios';
import { API_URI } from '../config';

export const getResources = async () =>
  await axios
    .get(`${API_URI}/resources`)
    .then(({ data }) => data)
    .catch((err) => console.error(err));

export const getTags = async () =>
  await axios
    .get(`${API_URI}/resource/tags`)
    .then(({ data }) => data)
    .catch((err) => console.error(err));

export const saveResource = async (resourceId) =>
  await axios
    .put(`${API_URI}/resource/${resourceId}/save`)
    .catch((err) => console.error(err));

export const unsaveResource = async (resourceId) =>
  await axios
    .put(`${API_URI}/resource/${resourceId}/unsave`)
    .catch((err) => console.error(err));

export const upvoteResource = async (resourceId) =>
  await axios
    .put(`${API_URI}/resource/${resourceId}/upvote`)
    .catch((err) => console.error(err));

export const unupvoteResource = async (resourceId) =>
  await axios
    .put(`${API_URI}/resource/${resourceId}/unupvote`)
    .catch((err) => console.error(err));
