import axios from 'axios';

require('dotenv/config');

const api = axios.create({
  baseURL: process.env.APP_URL,
});

export default api;
