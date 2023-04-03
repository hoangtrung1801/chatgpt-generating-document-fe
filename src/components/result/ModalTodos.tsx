import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
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
import React, { useEffect, useState } from "react";
import useTodoStoreStore from "stores/useTodosStore";

function ModalTodo({ isOpen, setIsOpen, itemSelected, setItemSelected }: any) {
    const { setTodos, todos } = useTodoStoreStore();
    const [item, setItem] = useState();
    const onClose = () => {
        setIsOpen(false);
    };
    const onSave = () => {
        const updatedFetchData2 = todos.map((data) => {
            if (data.id === itemSelected.id) {
                return { ...data, type: item }; // tạo ra một item mới với type mới
            } else {
                return data; // không phải item cần thay đổi, trả về item cũ
            }
        });
        console.log("updatedFetchData2:", updatedFetchData2);
        setTodos(updatedFetchData2);
        setIsOpen(false);
    };

    const finalRef = React.useRef(null);

    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>{itemSelected?.title}</Text>
                    <RadioGroup defaultValue={itemSelected?.status}>
                        <Stack spacing={[1, 2]} direction={"column"}>
                            <Radio
                                onChange={(value) =>
                                    setItem(value.target.value)
                                }
                                value="IN"
                            >
                                IN
                            </Radio>
                            <Radio
                                onChange={(value) => {
                                    console.log(value.target.value);
                                    // setItem(value.target.value)
                                }}
                                value="IN_PROGRESS"
                            >
                                IN_PROGRESS
                            </Radio>
                            <Radio
                                onChange={(value) =>
                                    setItem(value.target.value)
                                }
                                value="INPREVIEW"
                            >
                                INPREVIEW
                            </Radio>
                            <Radio
                                onChange={(value) =>
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
