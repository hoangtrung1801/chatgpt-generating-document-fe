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
import React, { useEffect, useMemo } from "react";
import CardTodo from "./CardTodo";
import useTodoStoreStore from "stores/useUserStoriesStore";
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
    console.log("userStories : ", userStories);
    const filteredUserStories = useMemo(() => {
        return {
            todo: userStories.filter((item: UserStory) => item.status === "IN"),
            inProgress: userStories.filter(
                (item: UserStory) => item.status === "IN_PROGRESS"
            ),
            inReview: userStories.filter(
                (item: UserStory) => item.status === "IN_REVIEW"
            ),
            done: userStories.filter(
                (item: UserStory) => item.status === "DONE"
            ),
        };
    }, [userStories]);

    const { todo, inProgress, inReview, done } = filteredUserStories;

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
