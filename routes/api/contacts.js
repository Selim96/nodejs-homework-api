const express = require('express');
const { contacts: cntrlrs } = require('../../controllers');
const { ctrlWrapper } = require("../../helpers");
const { validation, isValidId, auth } = require("../../middlewares");
const { schema } = require("../../models");

const router = express.Router();


router.get('/', auth, ctrlWrapper(cntrlrs.getAll));

router.get('/:contactId', auth, isValidId, ctrlWrapper(cntrlrs.getById));

router.post('/', auth, validation(schema.addContact), ctrlWrapper(cntrlrs.add));

router.delete('/:contactId', auth, isValidId, ctrlWrapper(cntrlrs.deleteById))

router.put('/:contactId', auth, isValidId, validation(schema.updtContact), ctrlWrapper(cntrlrs.updateById));

router.patch('/:contactId/favorite', auth, isValidId, validation(schema.patchContact), ctrlWrapper(cntrlrs.updateStatusContact));

module.exports = router;
