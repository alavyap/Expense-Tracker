const express = require("express");
const transactionRouter = express.Router();

const {
    fetchListOfTransactions,
    addNewTransaction,
    updateTransaction,
    deleteATransaction
} = require("../controller/expense-controller");


transactionRouter.get("/", fetchListOfTransactions);
transactionRouter.post("/add", addNewTransaction);
transactionRouter.put("/update/:id", updateTransaction);
transactionRouter.delete("/delete/:id", deleteATransaction);


module.exports = transactionRouter;