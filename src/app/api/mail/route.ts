import { render } from '@react-email/render';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import email from '@/emails/template1';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_AUTH_HOST,
  port: Number(process.env.EMAIL_AUTH_PORT || 465),
  secure: true, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.EMAIL_AUTH_USERNAME,
    pass: process.env.EMAIL_AUTH_PASSWORD
  },
  tls: {
    ciphers: 'SSLv3'
  },
  requireTLS: true,
  debug: true,
  connectionTimeout: 10000
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Invalid JSON input' }, { status: 400 });
    }

    if (!body?.to) {
      return NextResponse.json({ error: 'to is required' }, { status: 400 });
    }

    const info = await transporter.sendMail({
      from: '"TripPlazr 👻" <info@tripplazr.com>', // sender address
      to: body.to, // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: render(email({ authorName: 'Shosho' })) // html body
    });

    return NextResponse.json({ succeed: true, ...info }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
