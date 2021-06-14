/**
 * @author Harsh Patel
 * @description ToDo Item model.
 */

const mongoose = require("mongoose");

const ToDoItemSchema = mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            required: true,
        },

        description: {
            type: String,
            trim: true,
        },

        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = ToDoItem = mongoose.model("ToDoItem", ToDoItemSchema);
