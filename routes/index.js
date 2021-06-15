const express = require("express");
const AuthRoute = require("./auth");
const ToDoRoute = require("./todo");

const app = express();

app.use("/todo", AuthRoute);
app.use("/todo", ToDoRoute);

module.exports = app;
