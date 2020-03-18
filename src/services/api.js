import axios from 'axios';

require('dotenv/config');

const api = axios.create({
  baseURL: 'http://159.89.181.231:3333/',
  proxy: true,
});

export default api;
