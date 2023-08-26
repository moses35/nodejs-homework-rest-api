const nodemailer = require("nodemailer");

const { USER_EMAIL, EMAIL_INFO } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: USER_EMAIL,
    pass: EMAIL_INFO,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: USER_EMAIL,
  };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
