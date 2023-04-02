import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import useTodoStoreStore from "stores/useTodosStore";

function ModalTodo({ isOpen, setIsOpen }: any) {
    // const { onClose } = useDisclosure();

    // const [isLoading, setIsLoading] = useState(true);
    const { setTodos, todos } = useTodoStoreStore();
    const onClose = () => {
        setIsOpen(false);
    };
    const finalRef = React.useRef(null);

    return (
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        Sit nulla est ex deserunt exercitation anim occaecat.
                        Nostrud ullamco deserunt aute id consequat veniam
                        incididunt duis in sint irure nisi. Mollit officia
                        cillum Lorem ullamco minim nostrud elit officia tempor
                        esse quis. Sunt ad dolore quis aute consequat. Magna
                        exercitation reprehenderit magna aute tempor cupidatat
                        consequat elit dolor adipisicing. Mollit dolor eiusmod
                        sunt ex incididunt cillum quis. Velit duis sit officia
                        eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et
                        mollit incididunt nisi consectetur esse laborum eiusmod
                        pariatur proident Lorem eiusmod et. Culpa deserunt
                        nostrud ad veniam.
                    </Text>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button variant="ghost">Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
export default ModalTodo;
