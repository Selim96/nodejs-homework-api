const { Contact } = require('../../models');

const getAll = async (req, res) => {
        const { _id: owner } = req.user;
        const { page = 1, limit = 10, favorite } = req.query;
        const skip = (page - 1) * limit;
        
        const result = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit: Number(limit) }).populate("owner", "email");

        if (favorite) {
                const resultByFav = result.filter(item => String(item.favorite) === favorite);
                return res.json(resultByFav);
        }

        res.json(result);
};

module.exports = getAll;