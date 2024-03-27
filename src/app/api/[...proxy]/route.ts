import { NextRequest, NextResponse } from 'next/server';
import { headers as requestHeaders } from 'next/headers';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_URL_TEST,
  headers: {
    'Content-Type': 'application/json',
    'exp-api-key': process.env.API_KEY_TEST,
    Accept: 'application/json;version=2.0'
  },
  withCredentials: true
});

// if we want to forward all client headers to the server
// just add this line of code
// const headers = Object.fromEntries(headerList.entries());
// then pass the headers

export async function GET(request: NextRequest) {
  const locale = requestHeaders().get('Accept-Language');
  const headers = locale ? { 'Accept-Language': locale } : {};
  const path = request.nextUrl.pathname.replace('/api', '');
  const res = await axiosInstance.get(path, { headers });
  return NextResponse.json(res.data);
}

export async function POST(request: NextRequest) {
  const locale = requestHeaders().get('Accept-Language');
  const headers = locale ? { 'Accept-Language': locale } : {};
  const path = request.nextUrl.pathname.replace('/api', '');
  const body = await request.json();
  const res = await axiosInstance.post(path, body, { headers });
  return NextResponse.json(res.data);
}

export async function PUT(request: NextRequest) {
  const locale = requestHeaders().get('Accept-Language');
  const headers = locale ? { 'Accept-Language': locale } : {};
  const path = request.nextUrl.pathname.replace('/api', '');
  const body = await request.json();
  const res = await axiosInstance.post(path, body, { headers });
  return NextResponse.json(res.data);
}
