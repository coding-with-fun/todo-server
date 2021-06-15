/**
 * @author Harsh Patel
 * @description Main server file.
 */

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db_connection");
const logger = require("./config/logger");
const indexRoutes = require("./routes");
const morgan = require("morgan");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const allowedDomains = [
    process.env.WEBSITE_DOMAIN,
    "http://127.0.0.1:3000",
    "http://localhost:3000",
];
const corsErrorMessage =
    "You ar blocked by CORS and do not have the access. Only specific domains are allowed to access it.";

app.use(express.json());
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedDomains.indexOf(origin) !== -1) {
                return callback(null, true);
            }

            return callback(new Error(corsErrorMessage), false);
        },
    })
);
app.use(
    morgan(process.env.ENV === "DEV" ? "dev" : "combined", {
        stream: logger.stream,
    })
);

connectDB().then(() => {
    app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}...`);
    });

    app.use(indexRoutes);
});
