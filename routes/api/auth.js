const express = require("express");
const router = express.Router();

const { auth: cntrl } = require('../../controllers');
const { ctrlWrapper } = require("../../helpers");
const {auth, validation } = require("../../middlewares");
const { schemasUser } = require("../../models");

router.post("/signup", validation(schemasUser.registerSchema), ctrlWrapper(cntrl.register));

router.post("/login", validation(schemasUser.loginSchema), ctrlWrapper(cntrl.login));

router.get("/current", auth, ctrlWrapper(cntrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(cntrl.logout));

module.exports = router;