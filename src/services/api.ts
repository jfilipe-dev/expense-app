import axios from 'axios';

const api = axios.create({
  baseURL: 'https://sofit-mobile-challenge.herokuapp.com',
});

export default api;
