import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import React, { useContext } from 'react'
import { GlobalContext } from '../../context'
import TransactionForm from '../add-transaction/indes'
import TransactionChartSummary from '../chart'

const Summary = ({ onClose, isOpen }) => {
    const {
        totalExpense,
        totalIncome
    } = useContext(GlobalContext);

    return (
        <Box
            p={"6"}
            border={"1px solid"}
            overflow={"hidden"}
            borderRadius={"10"}
            background={"white"}
            display={"flex"}
        >
            <Flex
                w={"full"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={{
                    base: "column",
                    sm: "column",
                    md: "column",
                    lg: "row",
                    xl: "row"
                }}
            >
                <Flex
                    flex={1}
                    w={"full"}
                    flexDirection={"column"}
                    alignContent={"center"}
                    justifyContent={"space-evenly"}
                    ml={"-20"}
                    mr={"2"}
                >
                    <Heading size={"md"} mb={"4"} color={"gray.600"}>
                        Balance is ${totalIncome - totalExpense}
                    </Heading>
                    <Flex
                        justifyContent={"space-evenly"}
                        alignItems={"center"}
                        bg={"gray.50"}
                        w={"full"}
                        h={"100px"}
                        border={"1px solid"}
                        borderColor={"gray.100"}
                    >
                        <Flex direction={"column"}>
                            <Heading color={"gray.700"}> ${totalIncome}</Heading>
                            <Text color={"gray.600"}>Total Income</Text>
                        </Flex>
                    </Flex>
                    <Flex
                        justifyContent={"space-evenly"}
                        alignItems={"center"}
                        bg={"gray.50"}
                        w={"full"}
                        h={"100px"}
                        border={"1px solid"}
                        borderColor={"gray.100"}
                    >
                        <Flex direction={"column"}>
                            <Heading color={"gray.700"}> ${totalExpense}</Heading>
                            <Text color={"gray.600"}>Total Expense</Text>
                        </Flex>
                    </Flex>
                </Flex>
                <Box
                    flex={1}
                    mt={"10"}
                    ml={"-90px"}
                    mr={"5"}
                    width={"300px"}
                    height={"300px"}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <TransactionChartSummary expense={totalExpense} income={totalIncome} />
                </Box>
            </Flex>
            <TransactionForm onClose={onClose} isOpen={isOpen} />
        </Box>
    )
}

export default Summary
