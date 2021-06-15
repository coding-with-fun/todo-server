const express = require("express");
const { FetchUserDetails } = require("../controllers/user/Details");
const authenticateToken = require("../middleware/auth");

const UserRoute = express.Router();

UserRoute.get("/", authenticateToken(), FetchUserDetails);

module.exports = UserRoute;
