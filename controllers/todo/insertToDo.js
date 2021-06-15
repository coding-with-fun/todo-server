const logger = require("../../config/logger");
const ToDoItem = require("../../models/todoItem");
const User = require("../../models/user");

exports.InsertTodo = async (req, res) => {
    try {
        const { title, description } = req.body;

        const newToDoItem = new ToDoItem({
            title,
            description,
        });
        await newToDoItem.save();

        const userID = req.auth;
        const options = {
            new: true,
        };

        const user = await User.findByIdAndUpdate(
            userID,
            {
                $push: {
                    todoItems: newToDoItem._id,
                },
            },
            options
        )
            .populate("todoItems", "_id title description category amount date")
            .select({
                encryptedPassword: 0,
                salt: 0,
            });
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
                userExists: false,
            });
        }

        return res.status(200).json({
            message: "Transaction added successfully.",
            user,
        });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};
