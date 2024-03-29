import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_LOCAL_API_URL || '';

const instance = axios.create({
  baseURL,
  withCredentials: true
});

export default instance;
