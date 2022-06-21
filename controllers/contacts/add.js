const contacts = require('../../models');
const { createError } = require('../../helpers');
const schema = require("../../schemas");

const add = async (req, res) => {
        const { error } = schema.addContact.validate(req.body);
        if (error) {
            throw createError(400, "missing required name field");
        };
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
};

module.exports = add;