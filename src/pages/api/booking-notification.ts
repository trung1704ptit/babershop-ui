import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';


const mailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASS
  }
});


type Data = {
  success: boolean;
};


interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    from: string;
    to: string;
    body?: string;
    text?: string;
    subject: string;
    html?: string;
  }
}

export default function handler(req: ExtendedNextApiRequest, res: NextApiResponse<Data>) {
  const mailDetails = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.html
  };

  mailTransporter.sendMail(mailDetails, function (err: any, _: any) {
    if (err) {
      console.log('Error Occurs', err);
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true });
      console.log('Email sent successfully');
    }
  });
}
