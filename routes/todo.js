const express = require("express");
const { InsertTodo } = require("../controllers/todo/InsertToDo");
const authenticateToken = require("../middleware/auth");

const ToDoRoute = express.Router();

ToDoRoute.post("/insert", authenticateToken(), InsertTodo);

module.exports = ToDoRoute;
