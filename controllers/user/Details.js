const logger = require("../../config/logger");
const User = require("../../models/user");

exports.FetchUserDetails = async (req, res) => {
    try {
        const userID = req.auth;

        const user = await User.findById(userID)
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
            message: "User details found successfully.",
            userDetails: user,
        });
    } catch (error) {
        logger.error(error.message);
        return res.status(500).json({
            message: "Internal server error.",
        });
    }
};
