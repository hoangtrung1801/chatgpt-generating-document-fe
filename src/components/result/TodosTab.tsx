import { ArrowDownIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Card,
    CardBody,
    CardFooter,
    Heading,
    Stack,
    Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import CardTodo from "./CardTodo";
import useTodoStoreStore from "stores/useTodosStore";
const fetchData = [
    {
        type: "TODO",
        data: [
            {
                id: 1,
                content: "Implement feedback collector.",
            },
            {
                id: 2,
                content:
                    "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
            },
        ],
    },
    {
        type: "INPROCESS",
        data: [
            {
                id: 1,
                content: "Implement feedback collector.",
            },
            {
                id: 2,
                content:
                    "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
            },
        ],
    },
    {
        type: "INPREVIEW",
        data: [
            {
                id: 1,
                content: "Implement feedback collector.",
            },
            {
                id: 2,
                content:
                    "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
            },
        ],
    },
    {
        type: "DONE",
        data: [
            {
                id: 1,
                content: "Done.",
            },
            {
                id: 2,
                content:
                    "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
            },
            {
                id: 3,
                content:
                    "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
            },
            {
                id: 4,
                content:
                    "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
            },
        ],
    },
];

function TodosTab() {
    const { setTodos, todos } = useTodoStoreStore();
    useEffect(() => {
        setTodos(fetchData);
    }, [setTodos]);
    return (
        <Box display="flex" gap={4}>
            {fetchData.map((data) => (
                <CardTodo data={data} key={data.type} />
            ))}
            {/* <CardTodo title="TODO 2" />
            <CardTodo title="INPROCESS 2" />
            <CardTodo title="INPREVIEW 2" />
            <CardTodo title="DONE 2" /> */}
        </Box>
    );
}

export default TodosTab;
