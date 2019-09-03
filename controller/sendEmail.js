// // const secretKey = "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";
// const secretKey = "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";
// module.exports = (email, randomCode) =>{

//     const sgMail = require('@sendgrid/mail');
//     sgMail.setApiKey(secretKey);
//     const msg = {
//       to: email,
//       from: 'zohaibaslam201@gmail.com',
//       subject: 'FGCK Church: email varification code',
//       text: `Here is you secret code ${randomCode} copy it (CTRL+C) and past it (CTRL+V) on the text field you see on FDCK forget password page`,
//     //   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//     };
//     sgMail.send(msg);
//     return true;
// }
module.exports = async (email,  code) =>{

  var nodemailer = require('nodemailer');

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fgck201@gmail.com',
      pass: 'pakistan447266'
    }
  });
  
  var mailOptions = {
    from: 'Fgck',
    to: email,
    subject: 'Password Reset',
    text: `Here is the code ${code} from the email`
  };
  let sentEmail = false;
 await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
     sentEmail = false;
    } else {
      console.log('Email sent: ' + info.response);
      sentEmail = true;
    }
  });
  return sentEmail;
}

