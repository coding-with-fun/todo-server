const express = require("express");
const { DeleteTodo } = require("../controllers/todo/DeleteToDo");
const { InsertTodo } = require("../controllers/todo/InsertToDo");
const authenticateToken = require("../middleware/auth");

const ToDoRoute = express.Router();

ToDoRoute.post("/insert", authenticateToken(), InsertTodo);
ToDoRoute.delete("/delete", authenticateToken(), DeleteTodo);

module.exports = ToDoRoute;
