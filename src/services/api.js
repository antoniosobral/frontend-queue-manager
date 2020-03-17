import axios from 'axios';

require('dotenv/config');

const api = axios.create({
  baseURL: 'http://192.168.15.14:3333',
  proxy: false,
});

export default api;
