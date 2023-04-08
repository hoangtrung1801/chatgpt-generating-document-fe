import {
    Button,
    DrawerProps,
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
} from "@chakra-ui/react";
import createSprint from "lib/api/createSprint";
import useSelection from "lib/hooks/useSelection";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CreateSprintModalProps {}

const CreateSprintModal = ({
    onClose,
    isOpen,
}: Omit<CreateSprintModalProps & ModalProps, "children">) => {
    const router = useRouter();
    const documentId = Number(router.query.documentId);

    const { register, handleSubmit } = useForm();

    const [submitLoading, setSubmitLoading] = useState(false);

    const { mutateSelection } = useSelection(documentId);

    const onSubmit = (data) => {
        const { name, startDate, endDate } = data;
        setSubmitLoading(true);
        createSprint({
            name,
            startDate,
            endDate,
            selectionId: documentId,
        })
            .then((data) => {
                console.log("new sprint", data);
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
                    <ModalHeader>Create sprint</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Stack direction={"column"} spacing={4}>
                            <FormControl>
                                <FormLabel>Name</FormLabel>
                                <Input name="name" {...register("name")} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Start date</FormLabel>
                                <Input
                                    name="startDate"
                                    {...register("startDate")}
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>End date</FormLabel>
                                <Input
                                    name="endDate"
                                    {...register("endDate")}
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

// react component which is form for create sprint, it will have name, startDate, endDate input using chakra UI
// import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
// import { useForm } from "react-hook-form";
//
// interface CreateSprintFormProps {
//     onSubmit: (data: any) => void;
// }

// const CreateSprintForm = ({ onSubmit }: CreateSprintFormProps) => {

//     return (
//     );
// };

export default CreateSprintModal;
