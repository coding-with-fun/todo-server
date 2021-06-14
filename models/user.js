/**
 * @author Harsh Patel
 * @description User model.
 */

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
        },

        username: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },

        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },

        todoItems: [
            {
                type: ObjectId,
                ref: "ToDoItem",
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = User = mongoose.model("User", UserSchema);
