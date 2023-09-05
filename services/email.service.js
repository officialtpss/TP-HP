const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const _ = require('lodash');
const nodemailer = require('nodemailer');
const { EMAIL_USER, DEV_CLIENT_URL } = require('../config');

const signature = 'Highpiler';
const fromEmail = `Highpiler <${EMAIL_USER}>`;
const emailTemplatePath = path.join(__dirname, '../emailTemplates');
// const transporter = nodemailer.createTransport({
//   host: `${EMAIL_HOST}`,
//   port: `${MAIL_PORT}`,
//   auth: {
//     user: `${EMAIL_USER}`,
//     pass: `${EMAIL_PASS}`,
//   },
// });
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.CLIENT_EMAIL_USER,
    pass: process.env.CLIENT_EMAIL_PASS,
  },
});
const sendMail = (template, emailData, cb) => {
  const filePathContent = `${emailTemplatePath}/${template}.ejs`;
  const compiled = ejs.compile(fs.readFileSync(filePathContent, 'utf8'));
  const defaultParams = {
    signature,
    emailTemplatePath
  };
  emailData = { ...emailData, frontend_url: DEV_CLIENT_URL }
  const allParams = _.merge({}, defaultParams, emailData);
  const attach = []; // create an empty array

  if (allParams.attachfile) {
    attach.push({
      filename: allParams.attachfile,
      path: `${global.siteUrl}/uploads/${allParams.attachfile}`
    });
  }
  const html = mailTemplate(compiled(allParams));
  const mailOptions = {
    from: fromEmail,
    to: allParams.to,
    subject: allParams.subject, // Subject line
    html,
    attachments: attach
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log('Email Error ---', error);
      return cb(error, null);
    }
    console.log('Email Success');
    return cb(null, true);
  });
};

exports.Invite = (emailData, cb) => {
  sendMail('invite', emailData, (err) => {
    if (err) {
      return cb(err, null);
    }
    return cb(null, true);
  });
};

exports.HpsAreaInvite = (emailData, cb) => {
  sendMail('hps_area_invite', emailData, (err) => {
    if (err) {
      return cb(err, null);
    }
    return cb(null, true);
  });
};

exports.Signup = (emailData, cb) => {
  sendMail('signup', emailData, (err) => {
    if (err) {
      return cb(err, null);
    }
    return cb(null, true);
  });
};

exports.signupNotification = (emailData, cb) => {
  sendMail('signupnotification', emailData, (err) => {
    if (err) {
      return cb(err, null);
    }
    return cb(null, true);
  });
};

exports.ForotPassword = (emailData, cb) => {
  sendMail('forgotpassword', emailData, (err) => {
    if (err) {
      return cb(err, null);
    }
    return cb(null, true);
  });
};

exports.accountVerifcation = (emailData, cb) => {
  let emailTemplate = 'reject';
  if (emailData.status === 'active') {
    emailTemplate = 'approve';
  }
  sendMail(emailTemplate, emailData, (err) => {
    if (err) {
      return cb(err, null);
    }
    return cb(null, true);
  });
};

exports.agencyInvitation = (emailData, cb) => {
  sendMail('agencyinvite', emailData, (err) => {
    if (err) {
      return cb(err, null);
    }
    return cb(null, true);
  });
};

const mailTemplate = (content) => {
  return ` <!DOCTYPE html>
  <html lang="en">
  <head>
     <meta charset="UTF-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <link rel="preconnect" href="https://fonts.googleapis.com">
 <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
 <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
     <title>HighPiler</title>
     <style>
       p {
         color: #444444;font-size: 16px; font-weight: normal; line-height: 20px;font-family: Montserrat, sans-serif;
       }
     </style>
  </head>
  <body style='background: #F1F1F1;padding: 30px;'>
 
    <div style='background:#fff;box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; padding: 50px;max-width: 600px;margin: 0 auto;'>
     <div style='text-align: center; margin-bottom: 50px;'>
         <a href="https://highpiler-dev.techpss.com/"><img src="https://highpiler-dev.techpss.com/highpiler-gray.png" alt="logo" title="HighPiler" /></a></div>
         ${content}    
         <div style='margin-top: 50px'>
           <p style='color: #444444;font-size: 16px; font-weight: bold; line-height: 10px;font-family: Montserrat, sans-serif;'> Thanks</p> 
           <p style='color: #444444;font-size: 16px; font-weight: bold; line-height: 20px;font-family: Montserrat, sans-serif;'>HighPiler</p> 
        </div>
       
      </div>
    </body>
    </html>`
}