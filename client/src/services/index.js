import axios from 'axios';

const url = 'http://localhost:5000/resources';

export const getResources = () => axios.get(url);
