/**
 * @author Harsh Patel
 * @description Logger configuration file.
 */

const { createLogger, format, transports } = require("winston");
require("dotenv").config();

const options = {
    file: {
        filename: "logs/server.log",
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        handleExceptions: true,
        format: format.combine(
            format.timestamp({
                format: "DD-MMM-YYYY HH:mm:ss",
            }),
            format.align(),
            format.printf(
                (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
            )
        ),
    },

    console: {
        handleExceptions: true,
        format: format.combine(
            format.colorize(),
            format.timestamp({
                format: "DD-MMM-YYYY HH:mm:ss",
            }),
            format.align(),
            format.printf(
                (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
            )
        ),
    },
};

const fileTransport = new transports.File(options.file);
const consoleTransport = new transports.Console(options.console);
const logger = createLogger({
    transports:
        process.env.ENV === "DEV"
            ? [consoleTransport]
            : [fileTransport, consoleTransport],
    exitOnError: false,
});

logger.stream = {
    write(message) {
        logger.info(message);
    },
};

module.exports = logger;
