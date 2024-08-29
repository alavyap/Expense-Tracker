import { FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Radio, RadioGroup, Button } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { GlobalContext } from '../../context';

const TransactionForm = ({ onClose, isOpen }) => {
    const { formData, setFormData, value, setValue, updateTransactions } = useContext(GlobalContext);

    function handleFormChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/transactions/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description: formData.description,
                    amount: formData.amount,
                    category: value === "income" ? "Income" : "Expense",
                }),
            });

            const result = await response.json();

            if (response.ok) {
                console.log("Transaction added:", result);

                // Update the global context with the new transaction
                updateTransactions(result);

                // Reset form
                setFormData({
                    description: '',
                    amount: '',
                    category: ''
                });

            } else {
                console.error("Failed to add transaction:", result.message);
            }
        } catch (error) {
            console.error("Error adding transaction:", error);
        }

        onClose(); // Close the modal after submission
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Add New Transaction</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl>
                                <FormLabel>Enter Description</FormLabel>
                                <Input
                                    placeholder="Enter Transaction Description"
                                    name="description"
                                    type="text"
                                    onChange={handleFormChange}
                                    value={formData.description || ''}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Enter Amount</FormLabel>
                                <Input
                                    placeholder="Enter Transaction Amount"
                                    name="amount"
                                    type="number"
                                    onChange={handleFormChange}
                                    value={formData.amount || ''}
                                />
                            </FormControl>
                            <RadioGroup mt="5" value={value} onChange={setValue}>
                                <Radio value="income" colorScheme="blue">Income</Radio>
                                <Radio value="expense" ml={"3"} colorScheme="red">Expense</Radio>
                            </RadioGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button mr={"4"} onClick={onClose}>Cancel</Button>
                            <Button type="submit">Add</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </form>
        </Modal>
    );
};

export default TransactionForm;
