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

function TodosTab() {
    const { setTodos, todos } = useTodoStoreStore();
    const todoItems = todos.filter((item) => item.status === "IN");
    const inProcessItems = todos.filter(
        (item) => item.status === "IN_PROGRESS"
    );
    const inPreviewItems = todos.filter((item) => item.status === "INPREVIEW");
    const inDoneItems = todos.filter((item) => item.status === "DONE");
    console.log("todos : ", todos);

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
            {/* {types.map((type) =>
                // eslint-disable-next-line react/jsx-key
                fetchData2.map(
                    (data) =>
                        data.type === type && (
                            // eslint-disable-next-line react/jsx-key
                            <CardTodo title={type} data={data} />
                        )
                )
            )} */}
        </Box>
    );
}

export default TodosTab;
{
    /* <CardTodo title="TODO 2" />
            <CardTodo title="INPROCESS 2" />
            <CardTodo title="INPREVIEW 2" />
            <CardTodo title="DONE 2" /> */
}
