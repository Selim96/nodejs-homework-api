const { createError } = require("../../helpers");
const { User } = require("../../models");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw createError(409, "Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({...req.body, password: hashPassword});
    res.status(201).json({
        user: {
            email: result.email,
            subscription: "starter"
        }
    })
}

module.exports = register;