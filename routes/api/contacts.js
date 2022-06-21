const express = require('express');
const { contacts: cntrlrs } = require('../../controllers');
const { ctrlWrapper } = require("../../helpers");

const router = express.Router();


router.get('/', ctrlWrapper(cntrlrs.getAll));

router.get('/:contactId', ctrlWrapper(cntrlrs.getById));

router.post('/', ctrlWrapper(cntrlrs.add));

router.delete('/:contactId', ctrlWrapper(cntrlrs.deleteById))

router.put('/:contactId', ctrlWrapper(cntrlrs.updateById));

module.exports = router
