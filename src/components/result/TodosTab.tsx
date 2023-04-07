import { ArrowDownIcon } from "@chakra-ui/icons";
import {
    Avatar,
    Box,
    Card,
    CardBody,
    CardFooter,
    Flex,
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
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateUserStories } from "lib/api/userStories";
import ModalTodo from "./ModalTodos";

type UserStory = {
    id?: number;
    status?: string;
    selectionId?: number;
    content?: string;
};

// const columns = [
//     {
//         id: 1,
//         name: "TODOS",
//         items: [
//             {
//                 id: 2,
//                 content: "first",
//             },
//             {
//                 id: 3,
//                 content: "second",
//             },
//         ],
//     },
// ];
const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        // console.log("source: ", source);
        // // info of item is dragged
        // console.log(
        //     "item bị bỏ đi  : ",
        //     columns[source.droppableId].items[source.index]
        // );
        const { id: userStoryId, selectionId } =
            columns[source.droppableId].items[source.index];
        const status = columns[destination.droppableId].name;
        console.log("userStoryId : ", userStoryId);
        console.log("selectionId : ", selectionId);
        console.log("status : ", status);
        // console.log("columns destination : ", columns[destination.droppableId]);
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems,
            },
        });
        updateUserStories(
            selectionId,
            userStoryId,
            status === "TODOS" ? "IN" : status
        ).then((res) => {
            console.log("res", res);
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems,
            },
        });
    }
};
function TodosTab({ userStories }) {
    const [columns, setColumns] = useState([]);
    const [isFlag, setIsFlag] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [itemSelected, setItemSelected] = useState();
    console.log("columns : ", columns);
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
    useEffect(() => {
        if (todo && inProgress && inReview && done) {
            setColumns([
                {
                    id: 1,
                    name: "TODOS",
                    items: todo,
                },
                {
                    id: 2,
                    name: "IN_PROGRESS",
                    items: inProgress,
                },
                {
                    id: 3,
                    name: "IN_REVIEW",
                    items: inReview,
                },
                {
                    id: 4,
                    name: "DONE",
                    items: done,
                },
            ]);
            setIsFlag(true);
        }
    }, [todo, inProgress, inReview, done]);

    return (
        <>
            {isFlag && (
                <Flex
                    justifyContent="center"
                    height="100%"
                    flexDir={["column", "column", "row", "row"]}
                    gap={4}
                >
                    <DragDropContext
                        onDragEnd={(result) =>
                            onDragEnd(result, columns, setColumns)
                        }
                    >
                        {Object.entries(columns).map(
                            ([columnId, column], index) => {
                                return (
                                    <Flex
                                        flexDir="column"
                                        alignItems="center"
                                        gap={2}
                                        key={columnId}
                                        p={["4px 4px", "4px 10px"]}
                                        w={["100%", "100%", "100%", "25%"]}
                                        bg="#1a202c"
                                    >
                                        <Text mt={4}>
                                            {column.name} ({column.items.length}
                                            )
                                        </Text>
                                        <Box mt={8}>
                                            <Droppable
                                                droppableId={columnId}
                                                key={columnId}
                                            >
                                                {(provided, snapshot) => {
                                                    return (
                                                        <Box
                                                            // p={1}
                                                            w={250}
                                                            minH={500}
                                                            bg={
                                                                snapshot.isDraggingOver
                                                                    ? "#f4f5f7"
                                                                    : "#d4d6d8"
                                                            }
                                                            {...provided.droppableProps}
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                        >
                                                            {column.items.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <Draggable
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            draggableId={item.id.toString()}
                                                                            index={
                                                                                index
                                                                            }
                                                                        >
                                                                            {(
                                                                                provided,
                                                                                snapshot
                                                                            ) => {
                                                                                return (
                                                                                    <Box
                                                                                        minH="150px"
                                                                                        userSelect="none"
                                                                                        margin="0 0 8px 0"
                                                                                        color="black"
                                                                                        onClick={() => {
                                                                                            setIsOpen(
                                                                                                true
                                                                                            );
                                                                                            setItemSelected(
                                                                                                item
                                                                                            );
                                                                                        }}
                                                                                        ref={
                                                                                            provided.innerRef
                                                                                        }
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        style={{
                                                                                            padding: 16,
                                                                                            backgroundColor:
                                                                                                snapshot.isDragging
                                                                                                    ? "gray.300"
                                                                                                    : "white",
                                                                                            ...provided
                                                                                                .draggableProps
                                                                                                .style,
                                                                                        }}
                                                                                    >
                                                                                        {
                                                                                            item.title
                                                                                        }
                                                                                    </Box>
                                                                                );
                                                                            }}
                                                                        </Draggable>
                                                                    );
                                                                }
                                                            )}
                                                            {
                                                                provided.placeholder
                                                            }
                                                        </Box>
                                                    );
                                                }}
                                            </Droppable>
                                            <ModalTodo
                                                setItemSelected={
                                                    setItemSelected
                                                }
                                                itemSelected={itemSelected}
                                                isOpen={isOpen}
                                                setIsOpen={setIsOpen}
                                            />
                                        </Box>
                                    </Flex>
                                );
                            }
                        )}
                    </DragDropContext>
                </Flex>
                // <DragDropContext onDropEnd={(result) => console.log(result)}>
                //     {Object.entries(columns).map(([id, column]) => {
                //         // eslint-disable-next-line react/jsx-key
                //         return (
                //             <Droppable key={id} droppableId={id}>
                //                 {(provided, snapshot) => {
                //                     <div
                //                         {...provided.droppableProps}
                //                         ref={provided.innerRef}
                //                         style={{
                //                             background: snapshot.isDraggingOver
                //                                 ? "lightblue"
                //                                 : "lightgrey",
                //                             padding: 4,
                //                             width: 250,
                //                             minHeight: 500,
                //                         }}
                //                     >
                //                         {column.items.map((item, index) => {
                //                             return (
                //                                 <Draggble
                //                                     key={item.id}
                //                                     droppableId={item.id}
                //                                     index={index}
                //                                 >
                //                                     {(provided, snapshot) => {
                //                                         return (
                //                                             <div
                //                                                 ref={
                //                                                     provided.innerRef
                //                                                 }
                //                                                 {...provided.draggableProps}
                //                                                 {...provided.dragHandlerProps}
                //                                                 style={{
                //                                                     userSelect:
                //                                                         "none",
                //                                                     padding: 16,
                //                                                     margin: "0 0 8px 0",
                //                                                     minHeight:
                //                                                         "50px",
                //                                                     background:
                //                                                         snapshot.isDragging
                //                                                             ? "#263B4A"
                //                                                             : "#456C86",
                //                                                     color: "white",
                //                                                     ...provided
                //                                                         .draggableProps
                //                                                         .style,
                //                                                 }}
                //                                             >
                //                                                 {item.content}
                //                                             </div>
                //                                         );
                //                                     }}
                //                                 </Draggble>
                //                             );
                //                         })}
                //                     </div>;
                //                 }}
                //             </Droppable>
                //         );
                //     })}
                // </DragDropContext>
            )}
        </>

        // <Box
        //     display="flex"
        //     flexDir={["column", "column", "column", "row"]}
        //     gap={4}
        // >

        //     <CardTodo data={todo} title={`TODOS ${todo.length}`} />
        //     <CardTodo
        //         data={inProgress}
        //         title={`INPROCESS ${inProgress.length}`}
        //     />
        //     <CardTodo data={inReview} title={`INPREVIEW ${inReview.length}`} />
        //     <CardTodo data={done} title={`DONE ${done.length}`} />
        // </Box>
    );
}
export default TodosTab;
