const nodemailer = require("nodemailer");
const { SMTP } = require("../secure/private-keys")


module.exports = async function main(emailAddress, code) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });


    await transporter.sendMail({
        from: '"My dear 👻" <testkrstn@gmail.com>',
        to: emailAddress,
        subject: "One-Time-Access Password",
        text: "Please use this code to access your account: " + code,
    });


}
