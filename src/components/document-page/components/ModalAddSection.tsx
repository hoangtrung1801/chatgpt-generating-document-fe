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
import { yupResolver } from "@hookform/resolvers/yup";
import { TrashIcon } from "icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputField, InputFieldWithoutLabel } from "ui-kit";
import { defaultValues, schema_create_section } from "./data";

type Props = {
    ModalStatus: any;
    columns: any;
    setColumns: any;
    form: any;
    onSubmit: any;
};

const ModalAddSection = ({
    ModalStatus,
    setColumns,
    columns,
    form,
    onSubmit,
}: Props) => {
    const { handleSubmit, setValue, reset, watch } = form;

    const listSubsection = watch("subsection");

    // const onSubmit = async (values) => {
    //     const updatedColumnPreview = [...columns];
    //     updatedColumnPreview[0].items.push({
    //         id: columns[0].items.length + 1,
    //         title: values.title,
    //         content: values.subsection,
    //     });
    //     setColumns(updatedColumnPreview);
    //     reset();
    //     ModalStatus.onClose();
    // };
    return (
        <Modal isOpen={ModalStatus.isOpen} onClose={ModalStatus.onClose}>
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
                        {/* {Array.from({ length: numberOfSubsection }).map(
                            (_, _idx) => (
                                <SubSection
                                    key={_idx}
                                    _idx={_idx + 1}
                                    form={form}
                                />
                            )
                        )} */}
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

                        <Button type="submit">{"save"}</Button>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ModalAddSection;

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
