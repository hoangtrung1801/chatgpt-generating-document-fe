import { Box, Stack, useDisclosure } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { CardTableContent, LayoutGenerate } from "./components";
import { defaultValues, schema_create_section } from "./components/data";
import ModalAddSection from "./components/ModalAddSection";
import { ColumnPreview } from "./data";

type Props = {};
const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
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

export const PreviewDocument = (props: Props) => {
    const form = useForm<any>({
        resolver: yupResolver(schema_create_section),
        defaultValues,
    });
    const ModalStatus = useDisclosure();
    const ModalUpdateStatus = useDisclosure();
    const { handleSubmit, setValue, reset, watch } = form;

    const onSubmit = async (values) => {
        // update mode
        if (values.id) {
            const updatedColumnPreview = columns;
            const updatedItems = columns[0].items.map((item) => {
                if (item.id === values.id) {
                    return {
                        ...item,
                        title: values.title,
                        content: values.subsection,
                    };
                } else return item;
            });
            updatedColumnPreview[0].items = updatedItems;
            setColumns(updatedColumnPreview);
            reset();
            ModalUpdateStatus.onClose();
        } else {
            const updatedColumnPreview = [...columns];
            updatedColumnPreview[0].items.push({
                id: columns[0].items.length + 1,
                title: values.title,
                content: values.subsection,
            });
            setColumns(updatedColumnPreview);
            reset();
            ModalStatus.onClose();
        }
    };
    const [columns, setColumns] = useState(ColumnPreview);
    console.log("columns: ", columns);
    return (
        <LayoutGenerate
            handleCreateSection={() => ModalStatus.onOpen()}
            backAction={() => {}}
        >
            <Box overflow="auto">
                <DragDropContext
                    onDragEnd={(result) =>
                        onDragEnd(result, columns, setColumns)
                    }
                >
                    {Object.entries(columns).map(
                        ([columnId, column], index) => {
                            return (
                                <Stack key={index}>
                                    <Droppable
                                        droppableId={columnId}
                                        key={columnId}
                                    >
                                        {(provided, snapshot) => {
                                            return (
                                                <Box
                                                    w="full"
                                                    {...provided.droppableProps}
                                                    ref={provided.innerRef}
                                                >
                                                    {column.items.map(
                                                        (item, index) => {
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
                                                                            <CardTableContent
                                                                                form={
                                                                                    form
                                                                                }
                                                                                columns={
                                                                                    columns
                                                                                }
                                                                                setColumns={
                                                                                    setColumns
                                                                                }
                                                                                item={
                                                                                    item
                                                                                }
                                                                                provided={
                                                                                    provided
                                                                                }
                                                                                ModalUpdateStatus={
                                                                                    ModalUpdateStatus
                                                                                }
                                                                                onSubmit={
                                                                                    onSubmit
                                                                                }
                                                                            />
                                                                        );
                                                                    }}
                                                                </Draggable>
                                                            );
                                                        }
                                                    )}
                                                </Box>
                                            );
                                        }}
                                    </Droppable>
                                </Stack>
                            );
                        }
                    )}
                </DragDropContext>
                <ModalAddSection
                    onSubmit={onSubmit}
                    form={form}
                    columns={columns}
                    setColumns={setColumns}
                    ModalStatus={ModalStatus}
                />
            </Box>
        </LayoutGenerate>
    );
};
