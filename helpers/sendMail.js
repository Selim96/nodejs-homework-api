const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSOWRD } = process.env;

const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
        user: "selim94@meta.ua",
        pass: META_PASSOWRD
    }
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendMail = async (data) => {
    try {
        const mail = { ...data, from: "selim94@meta.ua" }
        await transporter.sendMail(mail);
        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = sendMail;

// ===================================================
// const sgMail = require("@sendgrid/mail");
// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApiKey(SENDGRID_API_KEY);

// const sendMail = async (data) => {
//     try {
//         const mail = { ...data, from: "selim.fazylov1@gmail.com" };
//         await sgMail.send(mail);
//         return true;
//     } catch (error) {
//         throw error;
//     }
// };

// module.exports = sendMail;