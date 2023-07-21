import { PlusSquareIcon } from "@chakra-ui/icons";
import {
    Button,
    FormLabel,
    HStack,
    Icon,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
} from "@chakra-ui/react";
import { TrashIcon } from "icons";
import { InputField, InputFieldWithoutLabel } from "ui-kit";

type Props = {
    ModalUpdateStatus: any;
    columns: any;
    setColumns: any;
    form: any;
    onSubmit: any;
    item: any;
};

const ModalUpdateSection = ({
    ModalUpdateStatus,
    setColumns,
    columns,
    form,
    onSubmit,
    item,
}: Props) => {
    const { handleSubmit, setValue, reset, watch } = form;

    const listSubsection = watch("subsection");

    return (
        <Modal
            isOpen={ModalUpdateStatus.isOpen}
            onClose={ModalUpdateStatus.onClose}
        >
            <ModalOverlay opacity={0.5} />
            <ModalContent>
                <ModalHeader>{"new section"}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack
                        onSubmit={handleSubmit(onSubmit)}
                        as="form"
                        h="100%"
                        gap={4}
                    >
                        <InputField
                            form={form}
                            label="title"
                            name="title"
                            placeholder="title"
                            type="text"
                        />
                        <FormLabel>{"subsection"}</FormLabel>

                        {listSubsection.map((_, _idx) => (
                            <SubSection key={_idx} _idx={_idx} form={form} />
                        ))}

                        <HStack
                            cursor="pointer"
                            onClick={() => {
                                let temp = [...listSubsection, ""];
                                setValue("subsection", temp);
                            }}
                        >
                            <Icon as={PlusSquareIcon} />
                            <Text>Add subsection</Text>
                        </HStack>

                        <Button type="submit">{"update"}</Button>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ModalUpdateSection;

const SubSection = ({ form, _idx }: any) => {
    const { setValue, watch } = form;
    const listSubsection = watch("subsection");
    // delete value form
    const handleDelete = () => {
        let temp = [...listSubsection];
        temp.splice(_idx, 1);
        setValue("subsection", temp);
    };
    return (
        <HStack>
            <InputFieldWithoutLabel
                form={form}
                _idx={_idx}
                nameOfArr="subsection"
                name={`subsection.${_idx}`}
                placeholder="subsection"
                type="text"
            />
            <Icon onClick={handleDelete} as={TrashIcon} />
        </HStack>
    );
};
