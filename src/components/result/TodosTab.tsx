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
import useUserStoriesOfSelection from "lib/hooks/useUserStoriesOfSelection";
import { useState } from "react";

type UserStory = {
    id?: number;
    status?: string;
    selectionId?: number;
    content?: string;
};
function TodosTab({ userStories }) {
    const [todo, setTodo] = useState(
        userStories.filter((item: UserStory) => item.status === "IN")
    );
    const [inProgress, setInProgress] = useState(
        userStories.filter((item: UserStory) => item.status === "IN_PROGRESS")
    );
    const [inReview, setInReview] = useState(
        userStories.filter((item: UserStory) => item.status === "IN_REVIEW")
    );
    const [done, setDone] = useState(
        userStories.filter((item: UserStory) => item.status === "DONE")
    );

    return (
        <Box display="flex" gap={4}>
            <CardTodo data={todo} title={`TODOS ${todo.length}`} />
            <CardTodo
                data={inProgress}
                title={`INPROCESS ${inProgress.length}`}
            />
            <CardTodo data={inReview} title={`INPREVIEW ${inReview.length}`} />
            <CardTodo data={done} title={`DONE ${done.length}`} />
        </Box>
    );
}
export default TodosTab;
