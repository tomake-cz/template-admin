/* eslint-disable no-console */
import * as nodemailer from 'nodemailer';
import { env } from '@/env';

export default defineEventHandler(async (e) => {
  const body = await readBody(e);

  if (!('text' in body)) {
    return {
      body: JSON.stringify({ error: 'No text in body' }),
    };
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.seznam.cz',
    port: 465,
    auth: {
      user: env.EMAIL_SENDER,
      pass: env.EMAIL_PASS,
    },
  });
  const mailOptions = {
    from: env.EMAIL_SENDER,
    to: env.EMAIL_RECEIVER,
    subject: 'Sending Email using Node.js',
    // text: 'That was easy!',
    html: `
    <h1>Welcome</h1>
    <p>That was easy!</p>
    <span>Text:</span>
    <span style="font-weight: bold; text-size: 28px;">${body.text}</span>
    `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return {
        body: JSON.stringify(error),
      };
    } else {
      console.log('Email sent: ' + info.response);
      return {
        body: JSON.stringify(info.response),
      };
    }
  });

  return {
    body,
  };
});
