const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        subscription,
        email
    })
};

module.exports = getCurrent;