const express = require('express');
const { contacts: cntrlrs } = require('../../controllers');
const { ctrlWrapper } = require("../../helpers");
const { validation, isValidId } = require("../../middlewares");
const { schema } = require("../../models");

const router = express.Router();


router.get('/', ctrlWrapper(cntrlrs.getAll));

router.get('/:contactId', isValidId, ctrlWrapper(cntrlrs.getById));

router.post('/', validation(schema.addContacts), ctrlWrapper(cntrlrs.add));

router.delete('/:contactId', isValidId, ctrlWrapper(cntrlrs.deleteById))

router.put('/:contactId', isValidId, validation(schema.updtContact), ctrlWrapper(cntrlrs.updateById));

router.patch('/:contactId/favorite', isValidId, validation(schema.patchContact), ctrlWrapper(cntrlrs.updateStatusContact));

module.exports = router;
