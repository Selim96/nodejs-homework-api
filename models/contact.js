const { Schema, model } = require("mongoose");
const Joi = require("joi");

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  // owner: {
  //   type: SchemaTypes.ObjectId,
  //   ref: 'user',
  // }
}, { versionKey: false, timestamps: true });
  
const addContact = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean()
});

const updtContact = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
    phone: Joi.string(),
  favorite: Joi.boolean()
}).min(1);

const patchContact = Joi.object({
    favorite: Joi.boolean().required()
})

const schema = {
    addContact,
    updtContact,
    patchContact
}

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schema,
};