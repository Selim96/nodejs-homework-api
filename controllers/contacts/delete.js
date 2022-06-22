const {Contact} = require('../../models');
const { createError } = require('../../helpers');

const deleteById = async (req, res) => {
        const { contactId } = req.params;
        const result = await Contact.findByIdAndRemove(contactId);
        if (!result) {
            throw createError(404);
        }
        res.json({
            "message": "contact deleted"
        });
};

module.exports = deleteById;