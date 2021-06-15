const express = require("express");
const AuthRoute = require("./auth");
const ToDoRoute = require("./todo");
const UserRoute = require("./user");

const app = express();

app.use("/todo", [AuthRoute, ToDoRoute, UserRoute]);

module.exports = app;
