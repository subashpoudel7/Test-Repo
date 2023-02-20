const nodemailer = require("nodemailer");

const AWS = require("aws-sdk");

const ses = new AWS.SES({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

async function sendEmail(to, subject, text) {
  const transporter = nodemailer.createTransport({
    SES: ses,
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: to.join(", "),
    subject: subject,
    text: text,
  });
}
module.exports = sendEmail;
