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
import useCurrentUser from "lib/hooks/useCurrentUser";
const types = ["TODO", "INPROCESS", "INPREVIEW", "DONE"];
const fetchData = [
    {
        data: [
            {
                id: 1,
                content: "Implement feedback collector.",
                type: "TODO",
            },
            {
                id: 2,
                content:
                    "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
                type: "TODO",
            },
        ],
    },
    {
        data: [
            {
                id: 1,
                content: "Implement feedback collector.",
            },
            {
                id: 2,
                content:
                    "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
                type: "INPROCESS",
            },
        ],
    },
    {
        data: [
            {
                id: 1,
                content: "Implement feedback collector.",
            },
            {
                id: 2,
                content:
                    "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
                type: "INPROCESS",
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
                type: "DONE",
            },
            {
                id: 3,
                content:
                    "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
                type: "DONE",
            },
            {
                id: 4,
                content:
                    "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
                type: "DONE",
            },
        ],
    },
];
const fetchData2 = [
    {
        id: 1,
        content: "Implement feedback collector.",
        type: "TODO",
    },
    {
        id: 2,
        type: "TODO",
        content:
            "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
    },
    {
        id: 3,
        type: "INPROCESS",
        content: "Implement feedback collector.",
    },
    {
        id: 4,
        type: "INPROCESS",
        content:
            "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
    },
    {
        id: 5,
        type: "INPROCESS",
        content:
            "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
    },
    {
        id: 5,
        type: "INPREVIEW",
        content: "Implement feedback collector.",
    },
    {
        id: 6,
        type: "INPREVIEW",
        content:
            "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
    },
    {
        id: 7,
        type: "DONE",
        content: "Done.",
    },
    {
        id: 8,
        type: "DONE",
        content:
            "Caffè latte is a coffee beverage of Italian origin made with espresso and steamed milk.",
    },
];

type todo = {
    id?: number;
    status?: string;
    selectionId?: number;
    content?: string;
};
function TodosTab() {
    const { setTodos, todos } = useTodoStoreStore();
    const todoItems = todos.filter((item: todo) => item.status === "IN");
    const inProcessItems = todos.filter(
        (item: todo) => item.status === "IN_PROGRESS"
    );
    const inPreviewItems = todos.filter(
        (item: todo) => item.status === "IN_REVIEW"
    );
    const inDoneItems = todos.filter((item: todo) => item.status === "DONE");

    return (
        <Box display="flex" gap={4}>
            <CardTodo data={todoItems} title={`TODOS ${todoItems.length}`} />
            <CardTodo
                data={inProcessItems}
                title={`INPROCESS ${inProcessItems.length}`}
            />
            <CardTodo
                data={inPreviewItems}
                title={`INPREVIEW ${inPreviewItems.length}`}
            />
            <CardTodo data={inDoneItems} title={`DONE ${inDoneItems.length}`} />
        </Box>
    );
}
export default TodosTab;
