const jwt = require("jsonwebtoken");
require("dotenv").config();

const logger = require("../../config/logger");
const User = require("../../models/user");

exports.UserSignIn = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await User.findOne({
            $or: [
                {
                    email,
                },
                {
                    username,
                },
            ],
        }).populate(
            "todoItems",
            "_id title description isCompleted createdAt updatedAt"
        );
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
            });
        }
        if (!user.authenticate(password)) {
            return res.status(400).json({
                message: "Please check credentials.",
            });
        }

        user = user.toJSON();
        delete user.salt;
        delete user.encryptedPassword;

        const token = jwt.sign(
            {
                _id: user._id,
            },
            process.env.SECRET,
            {
                expiresIn: "36hr",
            }
        );
        return res.status(200).json({
            message: "User found.",
            userToken: token,
            userDetails: user,
        });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};
