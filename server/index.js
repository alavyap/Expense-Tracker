const express = require("express");
const cors = require("cors");
const transactionRouter = require("./routes/expense-route");
require("./db/index");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/transactions", transactionRouter); // Make sure the path matches your frontend API call

// Catch-all route (for testing purposes)
app.use("/api", (req, res) => {
    res.send("Hello World");
});

app.listen(5000, () => console.log("App is running at 5000..."));
