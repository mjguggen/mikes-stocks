import axios from 'axios';

const api = axios.create({
    baseURL: 'https://stonks-backend.herokuapp.com/',
    headers: {
      'Content-Type': 'application/json'
    }
  });

export default api;
