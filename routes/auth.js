const express = require("express");
const { UserSignIn } = require("../controllers/auth/SignIn");
const { UserSignUp } = require("../controllers/auth/SignUp");

const AuthRoute = express.Router();

AuthRoute.post("/signup", UserSignUp);
AuthRoute.post("/signin", UserSignIn);

module.exports = AuthRoute;
