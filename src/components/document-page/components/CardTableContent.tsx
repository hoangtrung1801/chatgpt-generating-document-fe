import { CheckIcon } from "@chakra-ui/icons";
import { Box, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { TrashIcon } from "icons";
import ModalUpdateSection from "./ModalUpdateSection";

type TCardTableContentProps = {
    columns: any;
    setColumns: any;
    provided: any;
    item?: any;
    onSubmit: any;
    ModalUpdateStatus: any;
    form: any;
};

type EditableControlsProps = {
    columns: any;
    setColumns: any;
    item: any;
    isEditing: boolean;
    onSubmit: () => void;
    onCancel: () => void;
    onEdit: () => void;
};

export const CardTableContent = ({
    columns,
    setColumns,
    provided,
    item,
    onSubmit,
    form,
    ModalUpdateStatus,
}: TCardTableContentProps) => {
    const { handleSubmit, setValue, reset, watch } = form;
    const handleRemoveItem = (itemId) => {
        const updatedItems = columns[0].items.filter(
            (item) => item.id !== itemId
        );
        setColumns([{ ...columns[0], items: updatedItems }]);
    };

    return (
        <Stack
            spacing={6}
            userSelect="none"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
                padding: 16,
                ...provided.draggableProps.style,
            }}
        >
            <HStack w="100%" align="center" justify="space-between">
                <Text fontSize="md" fontWeight="bold">
                    {item.title}
                </Text>
                <HStack spacing={4}>
                    <Icon
                        w="24px"
                        h="24px"
                        color="black"
                        cursor="pointer"
                        onClick={() => handleRemoveItem(item.id)}
                        as={TrashIcon}
                    />
                    <Icon
                        w="24px"
                        h="24px"
                        color="black"
                        cursor="pointer"
                        onClick={() => {
                            setValue("subsection", item.content);
                            setValue("title", item.title);
                            setValue("id", item.id);
                            ModalUpdateStatus.onOpen();
                        }}
                        as={CheckIcon}
                    />
                </HStack>
            </HStack>
            <Box bg="blackAlpha.100" pl="30px" py="10px" borderRadius="4px">
                <VStack align="start" w="full" cursor="pointer">
                    {item.content.map((_, _idx) => (
                        <Text key={_idx}>{_}</Text>
                    ))}
                </VStack>
            </Box>
            <ModalUpdateSection
                item={item}
                onSubmit={onSubmit}
                form={form}
                columns={columns}
                setColumns={setColumns}
                ModalUpdateStatus={ModalUpdateStatus}
            />
        </Stack>
    );
};

// const EditableControls = ({
//     columns,
//     setColumns,
//     item,
//     isEditing,
//     onSubmit,
//     onCancel,
//     onEdit,
// }: EditableControlsProps) => {
//     // Hàm xử lý khi thay đổi nội dung item
//     const handleChangeItemContent = (itemId, newContent) => {
//         const updatedItems = columns[0].items.map((item) => {
//             if (item.id === itemId) {
//                 return { ...item, content: newContent };
//             }
//             return item;
//         });
//         setColumns([{ ...columns[0], items: updatedItems }]);
//     };
//     const [subContent, setSubContent] = useState(item.content as string);
//     const handleSubmit = () => {
//         handleChangeItemContent(item.id, subContent);
//         onSubmit();
//     };
//     const handleChange = (e) => {
//         setSubContent(e.target.value);
//     };
//     return isEditing ? (
//         <Flex fontSize="sm" gap="8px" align="center">
//             <Textarea
//                 color="text.100"
//                 fontSize="sm"
//                 bg="rgba(255, 255, 255, 0.1)"
//                 onChange={handleChange}
//                 value={subContent}
//             />
//             <CheckIcon w="20px" h="20px" onClick={handleSubmit} />
//             <CloseButton w="20px" h="20px" onClick={onCancel} />
//         </Flex>
//     ) : (
//         <Flex w="full" cursor="pointer" onClick={onEdit} align="center">
//             {"1.1. Content\n 1.2.Purpose"}
//         </Flex>
//     );
// };

// type EditableTitleControlsProps = {
//     columns: any;
//     setColumns: any;
//     item: any;
//     isEditing: boolean;
//     onSubmit: () => void;
//     onCancel: () => void;
//     onEdit: () => void;
// };
// const EditableTitleControls = ({
//     columns,
//     setColumns,
//     item,
//     isEditing,
//     onSubmit,
//     onCancel,
//     onEdit,
// }: EditableTitleControlsProps) => {
//     // Hàm xử lý khi thay đổi nội dung item
//     const handleChangeItemContent = (itemId, newContent) => {
//         const updatedItems = columns[0].items.map((item) => {
//             if (item.id === itemId) {
//                 return { ...item, title: newContent };
//             }
//             return item;
//         });
//         setColumns([{ ...columns[0], items: updatedItems }]);
//     };
//     const [title, setTitle] = useState(item.title as string);
//     const handleSubmit = () => {
//         handleChangeItemContent(item.id, title);
//         onSubmit();
//     };
//     const handleChange = (e) => {
//         setTitle(e.target.value);
//     };
//     return isEditing ? (
//         <Flex fontSize="md" fontWeight="bold" gap="8px" align="center">
//             <Input
//                 color="text.100"
//                 bg="rgba(255, 255, 255, 0.1)"
//                 onChange={handleChange}
//                 value={title}
//             />
//             <CheckIcon w="20px" h="20px" onClick={handleSubmit} />
//             <CloseButton w="20px" h="20px" onClick={onCancel} />
//         </Flex>
//     ) : (
//         <Flex w="full" cursor="pointer" onClick={onEdit} align="center">
//             <Text>{item.title}</Text>
//         </Flex>
//     );
// };
