import axios from 'axios';

require('dotenv/config');

const api = axios.create({
  baseURL: 'https://159.89.181.231',
  proxy: false,
});

export default api;
