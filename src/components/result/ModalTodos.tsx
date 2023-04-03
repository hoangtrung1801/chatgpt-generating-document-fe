import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Radio,
    RadioGroup,
    Stack,
    Text,
} from "@chakra-ui/react";
import { updateUserStories } from "lib/api/userStories";
import useUserStoriesOfSelection from "lib/hooks/useUserStoriesOfSelection";
import { useRouter } from "next/router";
import React, { useState } from "react";
import useTodoStoreStore from "stores/useTodosStore";

type todo = {
    id?: number;
    status?: string;
    selectionId?: number;
    content?: string;
};
function ModalTodo({ isOpen, setIsOpen, itemSelected, setItemSelected }: any) {
    const router = useRouter();
    const documentId = Number(router.query.documentId);

    const { mutate } = useUserStoriesOfSelection(documentId);

    const { setTodos, todos } = useTodoStoreStore();
    const [item, setItem] = useState();
    const onClose = () => {
        setIsOpen(false);
    };
    const onSave = () => {
        const updatedFetchData = todos.map((data: todo) => {
            if (data.id === itemSelected.id) {
                return { ...data, status: item }; // tạo ra một item mới với type mới
            } else {
                return data; // không phải item cần thay đổi, trả về item cũ
            }
        });
        setTodos(updatedFetchData);
        setIsOpen(false);
        updateUserStories(itemSelected.selectionId, itemSelected.id, item).then(
            (res) => {
                console.log("res", res);
                mutate();
            }
        );
    };

    const finalRef = React.useRef(null);

    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>Content: {itemSelected?.title}</Text>
                    <RadioGroup mt={6} defaultValue={itemSelected?.status}>
                        <Stack spacing={[1, 2]} direction={"column"}>
                            <Radio
                                onChange={(value: any) =>
                                    setItem(value.target.value)
                                }
                                value="IN"
                            >
                                TODO
                            </Radio>
                            <Radio
                                onChange={(value: any) => {
                                    setItem(value.target.value);
                                }}
                                value="IN_PROGRESS"
                            >
                                IN_PROGRESS
                            </Radio>
                            <Radio
                                onChange={(value: any) =>
                                    setItem(value.target.value)
                                }
                                value="IN_REVIEW"
                            >
                                INPREVIEW
                            </Radio>
                            <Radio
                                onChange={(value: any) =>
                                    setItem(value.target.value)
                                }
                                value="DONE"
                            >
                                DONE
                            </Radio>
                        </Stack>
                    </RadioGroup>
                </ModalBody>

                <ModalFooter>
                    <Button onClick={onClose} variant="ghost">
                        Close
                    </Button>
                    <Button onClick={onSave} colorScheme="blue" mr={3}>
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
export default ModalTodo;
