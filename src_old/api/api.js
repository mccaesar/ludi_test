import http from '../http-common';

const fetchResources = () => http.get('/resources');
const fetchResourceById = (id) => http.get(`/resources/${id}`);

export default {
  fetchResources,
  fetchResourceById,
};

// const create = (data) => http.post('/resources', data);

// const update = (id, data) => http.put(`/resources/${id}`, data);

// const remove = () => http.delete(`/resources`);

// const removeAll = (id) => http.delete(`/resources/${id}`);
