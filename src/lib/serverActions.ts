'use server';

import { headers } from 'next/headers';

export const getHostName = () => headers().get('host');
