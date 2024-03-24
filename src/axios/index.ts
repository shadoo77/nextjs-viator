import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_VIATOR_API_URL_TEST;

const instance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'exp-api-key': process.env.NEXT_PUBLIC_VIATOR_API_KEY_TEST,
    Accept: 'application/json;version=2.0'
  },
  withCredentials: true
});

export default instance;
