const { createError } = require("../../helpers");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const { SECRET_KEY } = process.env;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw createError(401, "Email or password is wrong");
    }
    if (!user.verify) {
        throw createError(401, "Email not verify");
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
        throw createError(401, "Email or password is wrong");
    }
    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY);
    await User.findByIdAndUpdate(user._id, { token });
    res.json({
        token,
        user: {
            email: user.email,
            subscription: "starter"
        }
    })
}

module.exports = login;