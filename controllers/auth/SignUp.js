const jwt = require("jsonwebtoken");
require("dotenv").config();

const logger = require("../../config/logger");
const User = require("../../models/user");

exports.UserSignUp = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        const existingUser = await User.findOne({
            $or: [
                {
                    email,
                },
                {
                    username,
                },
            ],
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists.",
            });
        }

        let user = new User({
            name,
            username,
            email,
            password,
        });
        await user.save();

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
            message: "New user created successfully.",
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
