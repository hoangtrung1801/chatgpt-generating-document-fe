import React, { useState } from "react";
import { ArrowDownIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Card,
    CardBody,
    CardFooter,
    Stack,
    Text,
} from "@chakra-ui/react";
import ModalTodo from "./ModalTodos";

function CardTodo({ data, title }: any) {
    console.log("data : ", data);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Box minH="75vh" p="4px 10px" w="25%" bg="#1a202c">
            <Text p="20px" fontWeight="bold" fontSize="16px">
                {title}
            </Text>
            {/* {data.map((item: any) => (
                <Card
                    onClick={() => {
                        setIsOpen(true);
                    }}
                    cursor="pointer"
                    _hover={{
                        bg: "gray.300",
                    }}
                    key={item.id}
                    mb={2}
                >
                    <Stack>
                        <CardBody>
                            <Text fontSize="16px" py="2">
                                {item.content}
                            </Text>
                        </CardBody>
                        <CardFooter>
                            <Box
                                w="full"
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Text>NUC-205</Text>
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap="4px"
                                >
                                    <Box
                                        borderRadius="50%"
                                        px={2}
                                        bg="gray.200"
                                    >
                                        <Text>9</Text>
                                    </Box>
                                    <ArrowDownIcon w="20px" h="20px" />
                                    <Avatar size="xs" />
                                </Box>
                            </Box>
                        </CardFooter>
                    </Stack>
                </Card>
            ))} */}
            <Card
                onClick={() => {
                    setIsOpen(true);
                }}
                cursor="pointer"
                _hover={{
                    bg: "gray.300",
                }}
                key={data.id}
                mb={2}
            >
                <Stack>
                    <CardBody>
                        <Text fontSize="16px" py="2">
                            {data.content}
                        </Text>
                    </CardBody>
                    <CardFooter>
                        <Box
                            w="full"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Text>NUC-205</Text>
                            <Box display="flex" alignItems="center" gap="4px">
                                <Box borderRadius="50%" px={2} bg="gray.200">
                                    <Text>9</Text>
                                </Box>
                                <ArrowDownIcon w="20px" h="20px" />
                                <Avatar size="xs" />
                            </Box>
                        </Box>
                    </CardFooter>
                </Stack>
            </Card>
            <ModalTodo isOpen={isOpen} setIsOpen={setIsOpen} />
        </Box>
    );
}

export default CardTodo;