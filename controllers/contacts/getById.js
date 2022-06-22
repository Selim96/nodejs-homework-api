const { Contact } = require('../../models');

const getById = async (req, res) => {
        const { contactId } = req.params;
        const contact = await Contact.findById(contactId);
        
        res.json(contact);
};

module.exports = getById;