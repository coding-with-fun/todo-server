const jwt = require("express-jwt");
const logger = require("../config/logger");

const authenticateToken = () => {
    return [
        jwt({
            secret: process.env.SECRET,
            algorithms: ["HS256"],
            userProperty: "auth",
            getToken: function getJWT(req) {
                let token = req.headers.authorization;

                if (token) {
                    token = token.split(" ");
                    if (token[0] === "Bearer") {
                        return token[1];
                    }
                }
            },
        }),
        (err, req, res, next) => {
            logger.error("Invalid token received.");
            return res.status(err.status).json({
                message: err.inner.message,
            });
        },
    ];
};

module.exports = authenticateToken;
