'use server';

import { headers, cookies } from 'next/headers';

export const getHostName = () => headers().get('host');

export const getCookie = (name: string) => cookies().get(name);

export const setCookie = async (name: string, value: string) =>
  cookies().set('Set-Cookie', `${name}=${value}`);

export const deleteCookie = async (name: string) => cookies().delete(name);
