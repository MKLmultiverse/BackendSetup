const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  console.log(options.email)
  console.log(options.subject)
  console.log(options.message)
  const transporter = nodemailer.createTransport({
    name:process.env.SMTP_MAIL,
    service: process.env.SMTP_SERVICE,
    host: "smtp.gmail.com",
    port: 465,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_MAIL,
      pass: process.env.SMTP_PASSWORD,
    }
  })
  const mailOptions = {
    from: process.env.SMTP_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  }

  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log("error sending mail : ", err);
    } else {
      console.log("mail has been sent:-", info.response)
    }
  });
}

module.exports = {sendEmail};