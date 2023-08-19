import {
    Box,
    BoxProps,
    Button,
    Heading,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useTableContents } from "stores";
import { ModalAddSection, CardTableContent } from "./components";
import {
    HandleUpdateColumns,
    onDragEnd,
    defaultValues,
    schema_create_section,
} from "./data";

interface TPreviewDocumentProps extends BoxProps {
    nextStep: () => void;
    backStep: () => void;
    ModalStatus: any;
}

export const PreviewDocument = ({
    ModalStatus,
    ...rest
}: TPreviewDocumentProps) => {
    const { columns, updateColumns } = useTableContents();
    const form = useForm<any>({
        resolver: yupResolver(schema_create_section),
        defaultValues,
    });
    const ModalUpdateStatus = useDisclosure();
    const { reset } = form;

    const onSubmit = async (values) => {
        // update mode
        if (values.id) {
            const updatedColumnPreview = HandleUpdateColumns(columns, values);
            updateColumns(updatedColumnPreview);
            reset();
            ModalUpdateStatus.onClose();
        } else {
            // create mode
            const updatedColumnPreview = columns;
            updatedColumnPreview[0].tableOfContents.push({
                id: columns[0].tableOfContents.length + 1,
                title: values.title,
                content: values.subsection,
            });
            updateColumns(updatedColumnPreview);
            reset();
            ModalStatus.onClose();
        }
    };

    return (
        <Box zIndex={2} {...rest} h="full" overflow="auto">
            <Text fontSize="2xl" fontWeight="bold">
                Your document is almost finished...
            </Text>
            <Text fontStyle="italic" fontSize="md" color="gray.500">
                Please recheck the table of content below.
            </Text>

            <DragDropContext
                onDragEnd={(result) =>
                    onDragEnd(result, columns, updateColumns)
                }
            >
                {Object.entries(columns).map(([columnId, column], index) => {
                    return (
                        <Stack key={index}>
                            <Droppable droppableId={columnId} key={columnId}>
                                {(
                                    droppableProvided,
                                    droppableProvidedSnapshot
                                ) => {
                                    return (
                                        <Box
                                            w="full"
                                            {...droppableProvided.droppableProps}
                                            ref={droppableProvided.innerRef}
                                        >
                                            {column.tableOfContents.map(
                                                (section, index) => {
                                                    return (
                                                        <Draggable
                                                            key={section.id}
                                                            draggableId={section.id.toString()}
                                                            index={index}
                                                        >
                                                            {(
                                                                DraggableProvided,
                                                                DraggableSnapshot
                                                            ) => {
                                                                return (
                                                                    <CardTableContent
                                                                        index={
                                                                            index
                                                                        }
                                                                        form={
                                                                            form
                                                                        }
                                                                        section={
                                                                            section
                                                                        }
                                                                        snapshot={
                                                                            DraggableSnapshot
                                                                        }
                                                                        provided={
                                                                            DraggableProvided
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
                })}
            </DragDropContext>
            <ModalAddSection
                onSubmit={onSubmit}
                form={form}
                ModalStatus={ModalStatus}
            />
        </Box>
    );
};
