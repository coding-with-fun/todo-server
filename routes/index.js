const express = require("express");
const AuthRoute = require("./auth");
const ToDoRoute = require("./todo");
const UserRoute = require("./user");

const app = express();

app.use("/todo", AuthRoute);
app.use("/todo", ToDoRoute);
app.use("/todo", UserRoute);

module.exports = app;
