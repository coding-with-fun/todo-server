/**
 * @author Harsh Patel
 * @description MongoDB connection file.
 */

const mongoose = require("mongoose");
const logger = require("./logger");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        logger.info(`Mongo DB connected successfully...`);
    } catch (error) {
        logger.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
