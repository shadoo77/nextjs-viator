import axios from 'axios';

const instance = axios.create({
  baseURL: '/ext-api',
  headers: {
    'Content-Type': 'application/json',
    'exp-api-key': process.env.NEXT_PUBLIC_API_KEY,
    Accept: 'application/json;version=2.0'
  },
  withCredentials: true
});

export default instance;
