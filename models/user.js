const { Schema, model } = require("mongoose");
const Joi = require("joi");

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const subscriptions = ["starter", "pro", "business"];

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 6
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: emailRegex
    },
    avatarURL: {
        type: String,
        required: true
    },
    subscription: {
        type: String,
        enum: [...subscriptions],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
}, { versionKey: false, timestamps: true });

const registerSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().required(),
    favorite: Joi.boolean()
});

const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegex).required(),
    password: Joi.string().required()
});

const subSchema = Joi.object({
    subscription: Joi.string().valid(...subscriptions).required()
});

const schemasUser = {
    registerSchema,
    loginSchema,
    subSchema
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemasUser
};