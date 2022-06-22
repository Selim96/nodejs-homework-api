const { isValidObjectId } = require("mongoose");
const { createError } = require('../helpers');

const isValidId = (req, res, next) => {
    const { contactId } = req.params;
    if (!isValidObjectId(contactId)) {
        next(createError(400, "Not Id"));
        return;
    }
    next();
}

module.exports = isValidId;