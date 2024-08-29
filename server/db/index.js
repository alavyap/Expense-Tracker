const mongoose = require("mongoose");
require('dotenv').config();  // Corrected: quotes around 'dotenv'

const MONGODBURL = process.env.MONGODB_URL;  // Ensure this matches the variable name in your .env file

mongoose.set("strictQuery", false);

mongoose.connect(MONGODBURL)
    .then(() => console.log("Connected to DB..."))
    .catch((e) => console.log(e));
