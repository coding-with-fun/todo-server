/**
 * @author Harsh Patel
 * @description Main server file.
 */

const express = require("express");
const connectDB = require("./config/db_connection");
const logger = require("./config/logger");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB().then(() => {
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}...`);
    });
});
