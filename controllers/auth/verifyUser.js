const { createError } = require("../../helpers");
const { User } = require("../../models");

const verifyUser = async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await User.findOne({ verificationToken });
        if (!user) {
            throw createError(404, "User not found");
        }
        await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });
        res.json({
            message: "Verification successful"
        });
    } catch (error) {
        next(error)
    }
}

module.exports = verifyUser;