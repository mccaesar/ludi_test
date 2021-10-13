import axios from 'axios';
import qs from 'qs';
import { API_URI } from '../config';

export const getCommentsByResourceId = async (resourceId) =>
  await axios
    .get(`${API_URI}/resource/${resourceId}/comments/20`)
    .then(({ data }) => data)
    .catch((err) => console.error(err));

export const createComment = async (data) => {
  return await axios
    .post(`${API_URI}/comment/create`, qs.stringify(data))
    .then(({ data }) => data)
    .catch((err) => console.error(err));
};

export const editComment = async (data) => {
  const { commentId } = data;
  await axios
    .put(`${API_URI}/comment/${commentId}/edit`, qs.stringify(data))
    .then(({ data }) => data)
    .catch((err) => console.error(err));
};

export const deleteComment = async (commentId) =>
  await axios
    .delete(`${API_URI}/comment/${commentId}/delete`)
    .catch((err) => console.error(err));

export const upvoteComment = async (commentId) =>
  await axios
    .put(`${API_URI}/comment/${commentId}/upvote`)
    .catch((err) => console.error(err));

export const unupvoteComment = async (commentId) =>
  await axios
    .put(`${API_URI}/comment/${commentId}/unupvote`)
    .catch((err) => console.error(err));
