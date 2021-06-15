const express = require("express");
const { UserSignUp } = require("../controllers/auth/SignUp");

const AuthRoute = express.Router();

AuthRoute.post("/signup", UserSignUp);

module.exports = AuthRoute;
