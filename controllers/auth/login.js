const { createError } = require("../../helpers");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw createError(401, "Email or password is wrong");
    }
    if (!bcrypt.compare(password, user.password)) {
        throw createError(401, "Email or password is wrong");
    }
    const token = "dfkljleifjask.jf;leijfs";
    res.json({
        token,
        user: {
            email: user.email,
            subscription: "starter"
        }
    })
}

module.exports = login;