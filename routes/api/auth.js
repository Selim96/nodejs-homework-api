const express = require("express");
const router = express.Router();

const { auth: cntrl } = require('../../controllers');
const { ctrlWrapper, createError } = require("../../helpers");
const {auth, validation, upload } = require("../../middlewares");
const { schemasUser, User } = require("../../models");

router.post("/signup", validation(schemasUser.registerSchema), ctrlWrapper(cntrl.register));

router.get("/verify/:verificationToken", async (req, res, next) => {
    try {
        const { verificationToken } = req.params;
        const user = await User.findOne({ verificationToken });
        if (!user) {
            throw createError(401);
        }
        await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });
        res.json({
            message: "Verification email sent"
        });
    } catch (error) {
        next(error)
    }
})

router.post("/login", validation(schemasUser.loginSchema), ctrlWrapper(cntrl.login));

router.get("/current", auth, ctrlWrapper(cntrl.getCurrent));

router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(cntrl.updateAvatar))

router.get("/logout", auth, ctrlWrapper(cntrl.logout));

router.patch("/", auth, validation(schemasUser.subSchema), ctrlWrapper(cntrl.changeSubscript));

module.exports = router;