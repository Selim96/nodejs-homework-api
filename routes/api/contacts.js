const express = require('express');
const contacts = require('../../models');
const { createError } = require('../../helpers');
const Joi = require("joi");

const router = express.Router();

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const joiSchemaPut = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error)
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.getContactById(id);
    if (!contact) {
      throw createError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw createError(404);
    }
    res.json({
      "message": "contact deleted"
    });
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiSchemaPut.validate(req.body);
    if (error) {
      throw createError(400, "missing fields");
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body)
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router
