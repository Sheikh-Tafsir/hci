const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter object using SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // SMTP server hostname
    port: 587, // SMTP server port (587 for TLS/STARTTLS, 465 for SSL/TLS)
    secure: false, // true for 465, false for other ports
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // your Gmail address
        pass: process.env.EMAIL_PASS // your app password
    }
});

const sendMailConfig = async(recipient, subject, text, html)=> {
    // Setup email data
    let mailOptions = {
        from: process.env.EMAIL, // sender address
        to: recipient, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        html: html // html body
    };

    // Return a Promise to properly handle asynchronous operations
    return new Promise((resolve, reject) => {
        // Send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error occurred:', error.message);
                reject('Error occurred:', error.message);
            } else {
                //console.log('Message sent successfully!');
                //console.log('Message ID:', info.messageId);
                resolve('Message sent successfully!');
            }
        })
    });
}

module.exports = sendMailConfig;
