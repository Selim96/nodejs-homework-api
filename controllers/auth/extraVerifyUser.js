const { createError, sendMail } = require("../../helpers");
const { User } = require("../../models");
const { SITE_URL } = process.env;

const extraVerifyUser = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw createError(404);
    }
    if (user.verify) {
        throw createError(400, "Verification has already been passed");
    }
    const { verificationToken } = user;
    const mail = {
        to: email,
        subject: "Confirm email",
        html: `<a target="_blank href="${SITE_URL}/api/users/verify/${verificationToken}">Click to confirm registration</a>`
    }
    await sendMail(mail);
    res.json({
        message: "Verification email sent"
    })
}

module.exports = extraVerifyUser;