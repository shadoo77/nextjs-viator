import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VIATOR_API_URL_TEST,
  headers: {
    'Content-Type': 'application/json',
    'exp-api-key': process.env.NEXT_PUBLIC_VIATOR_API_KEY_TEST,
    Accept: 'application/json;version=2.0'
  },
  withCredentials: true
});

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');
  const locale = request.nextUrl.searchParams.get('locale');
  const res = await axiosInstance.get(`${path}`, {
    headers: {
      'Accept-Language': locale
    }
  });
  return NextResponse.json(res.data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { path, locale, requestBody } = body;
  const res = await axiosInstance.post(`${path}`, requestBody, {
    headers: {
      'Accept-Language': locale
    }
  });
  return NextResponse.json(res.data);
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  const { path, locale, requestBody } = body;
  const res = await axiosInstance.post(`${path}`, requestBody, {
    headers: {
      'Accept-Language': locale
    }
  });
  return NextResponse.json(res.data);
}
