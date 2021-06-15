const express = require("express");
const { DeleteTodo } = require("../controllers/todo/DeleteToDo");
const { InsertTodo } = require("../controllers/todo/InsertToDo");
const { UpdateToDo } = require("../controllers/todo/UpdateToDo");
const authenticateToken = require("../middleware/auth");

const ToDoRoute = express.Router();

ToDoRoute.post("/insert", authenticateToken(), InsertTodo);
ToDoRoute.delete("/delete", authenticateToken(), DeleteTodo);
ToDoRoute.patch("/update", authenticateToken(), UpdateToDo);

module.exports = ToDoRoute;
