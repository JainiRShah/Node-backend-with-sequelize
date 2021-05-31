const nodemailer = require('nodemailer');

let transport = nodemailer.createTransport({
    service: 'Gmail',
    secure: false,//true
    port: 25,//465
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }, tls: {
        rejectUnauthorized: false
    }
});

const mailSend = (email, name) => {
    let mailOption = {
        to: email,
        subject: "User Details",
        text: ' ' + name + ' your detail is Successfully added', // Plain text body
    }

    const mailSending = transport.sendMail(mailOption, function (error, res) {
        if (error) {
        }
        else {
            logger.info("email has been sent");
        }
    })
    return mailSending;
};
module.exports = {
    mailSend
};