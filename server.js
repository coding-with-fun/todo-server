const express = require("express");
const connectDB = require("./config/db_connection");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}...`);
    });
});
