import nodemailer from 'nodemailer';
import ALERTS from '../types/enums/Alerts';

import { emailTemplate } from './mailTemplate';

export const sendEmail = async (alertType: ALERTS) => {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: '"MonsterPot" <alert@monsterpot.com>',
        to: process.env.EMAIL_ADDRESS,
        subject: 'Alert',
        html: emailTemplate(alertType, new Date()),
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId);
    } catch (err) {
        console.error('Error sending email:', err);
    }
};