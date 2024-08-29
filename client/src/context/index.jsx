import React, { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext(null);

const GlobalState = ({ children }) => {
    const [formData, setFormData] = useState({
        type: "income",
        amount: 0,
        description: ""
    });
    const [value, setValue] = useState("expense");
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [allTransactions, setAllTransactions] = useState([]);

    useEffect(() => {
        async function fetchTransactions() {
            try {
                const response = await fetch("http://localhost:5000/api/transactions");
                const data = await response.json();
                if (response.ok) {
                    console.log("Fetched transactions:", data.transactionList); // Debugging line
                    setAllTransactions(data.transactionList);
                } else {
                    console.error("Failed to fetch transactions:", data.message);
                }
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        }
        fetchTransactions();
    }, []);

    async function handleFormSubmit(currentFormData) {
        if (!currentFormData.description || !currentFormData.amount) return;

        try {
            const response = await fetch("http://localhost:5000/api/transactions/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: currentFormData.description,
                    amount: currentFormData.amount,
                    category: currentFormData.type === "income" ? "Income" : "Expense",
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setAllTransactions([
                    ...allTransactions,
                    data.newlyCreateTransaction,
                ]);
            } else {
                console.error("Failed to add transaction:", data.message);
            }
        } catch (error) {
            console.error("Error adding transaction:", error);
        }
    }

    async function handleDelete(id) {
        try {
            const response = await fetch(`http://localhost:5000/api/transactions/delete/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setAllTransactions(allTransactions.filter(transaction => transaction._id !== id));
            } else {
                console.error("Failed to delete transaction");
            }
        } catch (error) {
            console.error("Error deleting transaction:", error);
        }
    }

    useEffect(() => {
        let income = 0;
        let expense = 0;

        allTransactions.forEach((item) => {
            item.category === "Income"
                ? (income += parseFloat(item.amount))
                : (expense += parseFloat(item.amount));
        });

        setTotalExpense(expense);
        setTotalIncome(income);
    }, [allTransactions]);

    return (
        <GlobalContext.Provider
            value={{
                formData,
                setFormData,
                totalExpense,
                setTotalExpense,
                totalIncome,
                setTotalIncome,
                value,
                setValue,
                allTransactions,
                setAllTransactions,
                handleFormSubmit,
                handleDelete
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalState;
