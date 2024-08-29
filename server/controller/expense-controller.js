const mongoose = require("mongoose");
const Transaction = require("../model/Expense");

// Fetch list of transactions
const fetchListOfTransactions = async (req, res) => {
    let transactionList;

    try {
        transactionList = await Transaction.find();
    } catch (e) {
        console.log(e);
    }

    if (!transactionList) {
        return res.status(404).json({ message: "No Transaction Found" });
    }
    return res.status(200).json({ transactionList });
}

// Add a new transaction
const addNewTransaction = async (req, res) => {
    const { description, amount, category } = req.body;

    if (!description || !amount || !category) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const newTransaction = new Transaction({
            description,
            amount,
            category,
        });

        await newTransaction.save();
        return res.status(201).json({ newlyCreatedTransaction: newTransaction });
    } catch (error) {
        console.error("Error saving transaction:", error);
        return res.status(500).json({ message: "Failed to save transaction" });
    }
}

// Delete a transaction
const deleteATransaction = async (req, res) => {
    const id = req.params.id;

    try {
        const findCurrentTransaction = await Transaction.findByIdAndDelete(id);
        if (!findCurrentTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        return res.status(200).json({ message: "Successfully Deleted" });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Unable to Delete! Try Again" });
    }
}

// Update a transaction
const updateTransaction = async (req, res) => {
    const id = req.params.id;
    const { description, amount, category } = req.body; // Using `category`

    let currentTransactionToUpdate;

    try {
        currentTransactionToUpdate = await Transaction.findByIdAndUpdate(id, {
            description,
            amount,
            category // Using `category`
        }, { new: true }); // Return the updated document
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Something went wrong! Try Again" });
    }

    if (!currentTransactionToUpdate) {
        return res.status(500).json({ message: "Unable to Update" });
    }
    return res.status(200).json({ currentTransactionToUpdate });
}

module.exports = { fetchListOfTransactions, deleteATransaction, updateTransaction, addNewTransaction };
