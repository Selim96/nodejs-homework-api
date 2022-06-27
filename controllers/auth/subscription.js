const {User} = require("../../models");

const changeSubscript = async (req, res) => {
    const { subscription } = req.body;
    const { _id } = req.user;

    const newUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
    req.user.subscription = subscription;
    res.json({
        subscription: newUser.subscription,
        email: newUser.email
    })
}

module.exports = changeSubscript;