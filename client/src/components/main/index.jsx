import { Button, Flex, Heading, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useContext } from 'react';
import Summary from '../summary';
import ExpenseView from '../expense-view';
import { GlobalContext } from '../../context';

const Main = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        totalExpense,
        allTransactions,
        setTotalExpense,
        totalIncome,
        setTotalIncome,
    } = useContext(GlobalContext);

    useEffect(() => {
        console.log("All transactions:", allTransactions); // Debugging line

        let income = 0;
        let expense = 0;

        allTransactions.forEach((item) => {
            if (item.type === "income") {
                income += parseFloat(item.amount);
            } else if (item.type === "expense") {
                expense += parseFloat(item.amount);
            }
        });

        setTotalExpense(expense);
        setTotalIncome(income);
    }, [allTransactions, setTotalExpense, setTotalIncome]);

    return (
        <Flex textAlign={"center"} flexDirection={"column"} pr={"5"} pl={"5"}>
            <Flex alignItems={"center"} justifyContent={"space-between"} mt={"12"}>
                <Heading color={"blue.400"}
                    display={["none", "block", "block", "block", "block"]}>
                    Money Tracker
                </Heading>
                <Flex align={"center"}>
                    <Button onClick={onOpen} bg={"blue.300"} color={"black"} m={"4"}>
                        Add New Transaction
                    </Button>
                </Flex>
            </Flex>
            <Summary
                totalExpense={totalExpense}
                totalIncome={totalIncome}
                isOpen={isOpen} onClose={onClose}
            />
            <Flex
                w="full"
                alignItems={"flex-start"}
                justifyContent={"space-evenly"}
                flexDirection={["column", "column", "column", "row", "row"]}
            >
                <ExpenseView
                    data={allTransactions.filter(item => item.category === "Expense")}
                    type={"expense"}
                />

                <ExpenseView
                    data={allTransactions.filter(item => item.category === "Income")}
                    type={"income"}
                />
            </Flex>

        </Flex>
    );
}

export default Main;
