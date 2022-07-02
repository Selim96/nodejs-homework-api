const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const changeSubscript = require("./subscription");
const updateAvatar = require("./updateAvatar");
const verifyUser = require("./verifyUser");
const extraVerifyUser = require("./extraVerifyUser");

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    changeSubscript,
    updateAvatar,
    verifyUser,
    extraVerifyUser
}