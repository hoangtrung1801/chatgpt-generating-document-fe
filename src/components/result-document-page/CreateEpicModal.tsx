import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalProps,
    Stack,
    Textarea,
} from "@chakra-ui/react";
import createEpic from "lib/api/createEpic";
import useSelection from "lib/hooks/useSelection";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CreateEpicModalProps {}

const CreateEpicModal = ({
    onClose,
    isOpen,
}: Omit<CreateEpicModalProps & ModalProps, "children">) => {
    const router = useRouter();
    const documentId = Number(router.query.documentId);

    const { register, handleSubmit } = useForm();

    const [submitLoading, setSubmitLoading] = useState(false);

    const { mutateSelection } = useSelection(documentId);

    const onSubmit = (data) => {
        const { title, description } = data;
        console.log(data);
        setSubmitLoading(true);
        createEpic({
            title,
            description,
            selectionId: documentId,
        })
            .then((data) => {
                console.log("new epic", data);
                mutateSelection();
                setSubmitLoading(false);
                onClose();
            })
            .catch((err) => {
                console.log("error", err);
                setSubmitLoading(false);
            });
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader>Create epic</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Stack direction={"column"} spacing={4}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input name="name" {...register("title")} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    minH={40}
                                    name="description"
                                    {...register("description")}
                                />
                            </FormControl>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            type="submit"
                            isLoading={submitLoading}
                        >
                            Create
                        </Button>
                        <Button colorScheme="gray" onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
export default CreateEpicModal;
