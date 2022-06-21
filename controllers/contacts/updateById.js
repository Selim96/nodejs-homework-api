const contacts = require('../../models');
const { createError } = require('../../helpers');
const schema = require("../../schemas");

const updateById = async (req, res) => {
        const { error } = schema.updtContact.validate(req.body);
        if (error) {
            throw createError(400, "missing fields");
        }
        const { contactId } = req.params;
        const result = await contacts.updateContact(contactId, req.body)
        if (!result) {
            throw createError(404);
        }
        res.json(result);
};

module.exports = updateById;