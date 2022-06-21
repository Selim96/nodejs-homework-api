const contacts = require('../../models');

const add = async (req, res) => {
        const result = await contacts.addContact(req.body);
        res.status(201).json(result);
};

module.exports = add;