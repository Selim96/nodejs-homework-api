const contacts = require('../../models');
const { createError } = require('../../helpers');

const updateById = async (req, res) => {
        const { contactId } = req.params;
        const result = await contacts.updateContact(contactId, req.body)
        if (!result) {
            throw createError(404);
        }
        res.json(result);
};

module.exports = updateById;