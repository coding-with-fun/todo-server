const logger = require("../../config/logger");
const ToDoItem = require("../../models/todoItem");

exports.UpdateToDo = async (req, res) => {
    try {
        const { _id, title, description, isCompleted } = req.body;
        const options = {
            new: true,
        };

        if (!_id) {
            return res.status(400).json({
                message: "ToDo ID is not passed.",
            });
        }

        await ToDoItem.findByIdAndUpdate(
            _id,
            {
                title,
                description: description || "",
                isCompleted,
            },
            options
        );

        return res.status(200).json({
            message: "ToDo item updated successfully.",
        });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};
