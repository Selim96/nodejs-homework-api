const { creatError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const { SECRET_KEY } = process.env;

const auth = async (req, res, next) => {
    try {
        const { authorization = "" } = req.headers;
        const [bearer, token] = authorization.split(" ");
        if (bearer !== "Bearer") {
            throw creatError(401);
        }
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token) {
            throw creatError(401);
        }
        req.user = user;
        next();
    } catch (error) {
        if (error.message === "Invalid signature") {
            error.status = 401;
        }
        next(error)
    }
    
}

module.exports = auth;