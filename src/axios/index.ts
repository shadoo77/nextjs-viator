import axios from 'axios';
import { isSSR } from '@/lib/utils';

const instance = axios.create({
  baseURL: isSSR ? process.env.API_URL : '/ext-api',
  headers: {
    'Content-Type': 'application/json',
    'exp-api-key': process.env.NEXT_PUBLIC_API_KEY,
    Accept: 'application/json;version=2.0'
  },
  withCredentials: true
});

export default instance;
