const express = require('express');
const { contacts: cntrlrs } = require('../../controllers');
const { ctrlWrapper } = require("../../helpers");
const { validation } = require("../../middlewares");
const { addContacts, updtContact } = require("../../schemas");

const router = express.Router();


router.get('/', ctrlWrapper(cntrlrs.getAll));

router.get('/:contactId', ctrlWrapper(cntrlrs.getById));

router.post('/', validation(addContacts), ctrlWrapper(cntrlrs.add));

router.delete('/:contactId', ctrlWrapper(cntrlrs.deleteById))

router.put('/:contactId', validation(updtContact), ctrlWrapper(cntrlrs.updateById));

module.exports = router;
