import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL_TEST,
  headers: {
    'Content-Type': 'application/json',
    'exp-api-key': process.env.API_KEY_TEST,
    Accept: 'application/json;version=2.0'
  },
  withCredentials: true
});

export const errorHandler = (error: any) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const response = axiosError.response;
    if (response) {
      return NextResponse.json(response.data, { status: response.status });
    }
  }
  return NextResponse.json({ error: error.message }, { status: 500 });
};

export default axiosInstance;
