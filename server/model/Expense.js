const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const transactionSchema = new Schema({

    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["Income", "Expense"],
        required: true
    },

}, {
    timestamps: true, //Automatically creates "created" and "updated"
})


const Transaction = mongoose.model("Tranaction", transactionSchema);

module.exports = Transaction