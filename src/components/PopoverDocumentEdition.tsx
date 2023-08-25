// import { deleteDocument } from "@/api/documents";
import { DeleteIcon } from "@chakra-ui/icons";
import { TrashIcon } from "icons";
import {
    Button,
    ButtonGroup,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    useDisclosure,
    useToast,
    Icon,
    Text,
    Box,
    Stack,
    HStack,
} from "@chakra-ui/react";
import { ThreeDotsIcon } from "icons";
import { deleteDocument } from "lib/api/document";
import useUserSelections from "lib/hooks/useUserSelections";
// import { useMutation, useQueryClient } from "react-query";
export type TPopoverDocumentEdition = { document_id: string; selection: any };
export function PopoverDocumentEdition({
    document_id,
    selection,
}: TPopoverDocumentEdition) {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const { mutateUserSelection } = useUserSelections();
    const toast = useToast();
    const handleDelete = async () => {
        try {
            const res = await deleteDocument(Number(document_id));
            toast({ description: res.message, status: "success" });
            mutateUserSelection();
        } catch (error) {
            toast({ description: error, status: "error" });
        }
    };

    return (
        <Popover
            isOpen={isOpen}
            onClose={onClose}
            placement="right"
            closeOnBlur={true}
        >
            <PopoverTrigger>
                <Icon
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggle();
                    }}
                    as={ThreeDotsIcon}
                />
            </PopoverTrigger>
            <PopoverContent
                p="8px"
                w="fit-content"
                bg="white"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <PopoverHeader borderColor="#e5e0df" p="12px">
                    <Text>{selection.projectName}</Text>
                    <Text fontSize="sm" color="#8f8b8b">
                        Created August 22nd, 2023
                    </Text>
                </PopoverHeader>
                <PopoverBody>
                    <Box>
                        <HStack onClick={handleDelete} p="4px">
                            <Icon as={TrashIcon} />
                            <Text>Send to Trash</Text>
                        </HStack>
                    </Box>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
