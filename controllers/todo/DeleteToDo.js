const logger = require("../../config/logger");
const ToDoItem = require("../../models/todoItem");
const User = require("../../models/user");

exports.DeleteTodo = async (req, res) => {
    try {
        const todoID = req.query.id;

        if (!todoID) {
            return res.status(400).json({
                message: "ToDo ID is not passed.",
            });
        }

        const deletedToDoItem = ToDoItem.findByIdAndDelete(todoID);
        if (!deletedToDoItem) {
            return res.status(400).json({
                message: "ToDO item is not found with the given ID.",
            });
        }

        const userID = req.auth;
        const options = {
            new: true,
        };

        const user = await User.findByIdAndUpdate(
            userID,
            {
                $pull: {
                    todoItems: todoID,
                },
            },
            options
        )
            .populate(
                "todoItems",
                "_id title description isCompleted createdAt updatedAt"
            )
            .select({
                encryptedPassword: 0,
                salt: 0,
            });
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
            });
        }

        return res.status(200).json({
            message: "ToDo item deleted successfully.",
            userDetails: user,
        });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};
