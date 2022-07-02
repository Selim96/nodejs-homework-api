const { createError, sendMail } = require("../../helpers");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, "Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const verificationToken = v4();
    const result = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
        verificationToken
    });
    const mail = {
        to: email,
        subject: "Confirm email",
        html: `<a target="_blank href="http://localhost:3000/api/users/verify/${verificationToken}">Click to confirm registration</a>`
    }
    await sendMail(mail);
    res.status(201).json({
        user: {
            email: result.email,
            subscription: "starter"
        }
    })
}

module.exports = register;