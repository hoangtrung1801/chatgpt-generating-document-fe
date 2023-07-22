import { Box, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { EditIcon, TrashIcon } from "icons";
import { useTableContents } from "stores";
import { TSection } from "components/document-page/data";
import ModalUpdateSection from "./ModalUpdateSection";

type TCardTableContentProps = {
    provided: any;
    snapshot: any;
    section: TSection;
    onSubmit: any;
    ModalUpdateStatus: any;
    form: any;
    index: number;
};

export const CardTableContent = ({
    index,
    provided,
    section,
    onSubmit,
    form,
    ModalUpdateStatus,
    snapshot,
}: TCardTableContentProps) => {
    const { columns, updateColumns } = useTableContents();
    const { setValue } = form;
    const handleRemoveItem = (itemId: number) => {
        const updatedItems = columns[0].tableOfContents.filter(
            (item) => item.id !== itemId
        );
        updateColumns([{ ...columns[0], tableOfContents: updatedItems }]);
    };

    return (
        <Stack
            spacing={2}
            userSelect="none"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
                padding: 10,
                borderRadius: 4,
                borderColor: snapshot.isDragging
                    ? "1px solid rgb(0, 102, 255)"
                    : "transparent",
                opacity: snapshot.isDragging && "1",
                ...provided.draggableProps.style,
            }}
        >
            <HStack w="100%" align="center" justify="space-between">
                <Text fontSize="md" fontWeight="bold">
                    {`${index + 1}. ${section.title}`}
                </Text>
                <HStack spacing={4}>
                    <Icon
                        w="20px"
                        h="20px"
                        color="black"
                        cursor="pointer"
                        onClick={() => {
                            setValue("subsection", section.content);
                            setValue("title", section.title);
                            setValue("id", section.id);
                            ModalUpdateStatus.onOpen();
                        }}
                        as={EditIcon}
                    />
                    <Icon
                        w="20px"
                        h="20px"
                        color="black"
                        cursor="pointer"
                        onClick={() => handleRemoveItem(section.id)}
                        as={TrashIcon}
                    />
                </HStack>
            </HStack>
            <Box bg="blackAlpha.100" pl="30px" py="10px" borderRadius="4px">
                <VStack align="start" w="full" cursor="pointer">
                    {section.content.map((_, _idx) => (
                        <Text fontSize="sm" key={_idx}>{`${index + 1}.${
                            _idx + 1
                        }. ${_}`}</Text>
                    ))}
                </VStack>
            </Box>
            <ModalUpdateSection
                onSubmit={onSubmit}
                form={form}
                ModalUpdateStatus={ModalUpdateStatus}
            />
        </Stack>
    );
};
