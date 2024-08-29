import { Box, Flex, Heading, Text, IconButton } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { GlobalContext } from '../../context';

const ExpenseView = ({ type, data }) => {
    const { handleDelete } = useContext(GlobalContext);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <Box
            flex={1} w="full" bg={"white"} mr={"4"} mt={"10"} p={"5"} pb={"4"}
            border={"1px solid"} borderColor={"gray.100"} borderRadius={"12"}
        >
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Heading size={"md"} color={type === "income" ? "blue.700" : "red.700"}>
                    {type === "income" ? "Income" : "Expense"}
                </Heading>
            </Flex>

            {data.length === 0 ? (
                <Text color="gray.500" textAlign="center" mt="4">No {type}s found.</Text>
            ) : (
                data.map((item, index) => (
                    <Flex
                        key={item._id}
                        bg={type === "expense" ? "red.50" : "blue.50"}
                        mt={"4"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        border={"1px solid"}
                        borderColor={type === "expense" ? "red.100" : "blue.100"}
                        p={"4"}
                        borderRadius={"8"}
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        position="relative"
                    >
                        <Flex alignItems={"center"} justifyContent={"flex-start"} flex="1">
                            <Text ml="3" fontWeight="bold" color="gray.600">
                                {item.description}
                            </Text>
                        </Flex>

                        {hoveredIndex === index && (
                            <IconButton
                                icon={<FaTrash />}
                                size="xs"
                                colorScheme="red"
                                onClick={() => handleDelete(item._id)}
                                mx="4"
                            />
                        )}

                        <Text>$ {item.amount}</Text>
                    </Flex>
                ))
            )}
        </Box>
    );
};

export default ExpenseView;
