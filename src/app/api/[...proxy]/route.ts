import { NextRequest, NextResponse } from 'next/server';
import { headers as requestHeaders } from 'next/headers';
import axios, { errorHandler } from './helper';

// if we want to forward all client headers to the server
// just add this line of code
// const headers = Object.fromEntries(headerList.entries());
// then pass the headers

export async function GET(request: NextRequest) {
  try {
    const locale = requestHeaders().get('Accept-Language');
    const headers = locale ? { 'Accept-Language': locale } : {};
    const path = request.nextUrl.pathname.replace('/api', '');
    const res = await axios.get(path, { headers });
    return NextResponse.json(res.data);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const locale = requestHeaders().get('Accept-Language');
    const headers = locale ? { 'Accept-Language': locale } : {};
    const path = request.nextUrl.pathname.replace('/api', '');
    const body = await request.json();
    const res = await axios.post(path, body, { headers });
    return NextResponse.json(res.data);
  } catch (error) {
    return errorHandler(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const locale = requestHeaders().get('Accept-Language');
    const headers = locale ? { 'Accept-Language': locale } : {};
    const path = request.nextUrl.pathname.replace('/api', '');
    const body = await request.json();
    const res = await axios.post(path, body, { headers });
    return NextResponse.json(res.data);
  } catch (error) {
    return errorHandler(error);
  }
}
