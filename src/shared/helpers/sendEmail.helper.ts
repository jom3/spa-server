import { createTransport } from 'nodemailer';


export const sendEmail = async (emailTo: string, message: string) => {
  const transporter = createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.MAILER_USER}`,
      pass: `${process.env.MAILER_PASS}`,
    }
  });
 
  await transporter.sendMail({
    from: `"SPA service" <${process.env.MAILER_USER}>`, // sender address
    to: emailTo, // list of receivers
    subject: 'Delivery of information', // Subject line
    text:'asd',
    html: message, // html body
  });
};
