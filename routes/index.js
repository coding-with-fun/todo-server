const express = require("express");
const AuthRoute = require("./auth");

const app = express();

app.use("/todo", AuthRoute);

module.exports = app;
