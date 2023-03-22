import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
    ButtonGroup,
    Editable,
    EditableInput,
    EditablePreview,
    EditableTextarea,
    Flex,
    IconButton,
    Input,
    useEditableControls,
} from "@chakra-ui/react";
type props = {
    content: string;
    isTitle: boolean;
};
export default function CustomResultItem({ content, isTitle }: props) {
    /* Here's a custom control */
    function EditableControls() {
        const {
            isEditing,
            getSubmitButtonProps,
            getCancelButtonProps,
            getEditButtonProps,
        } = useEditableControls();

        return isEditing ? (
            <ButtonGroup justifyContent="center" size="sm">
                <IconButton
                    aria-label="CheckIcon"
                    icon={<CheckIcon />}
                    {...getSubmitButtonProps()}
                />
                <IconButton
                    aria-label="CloseIcon"
                    icon={<CloseIcon />}
                    {...getCancelButtonProps()}
                />
            </ButtonGroup>
        ) : (
            <Flex justifyContent="center">
                <IconButton
                    aria-label="EditIcon"
                    color="blue.500"
                    size="sm"
                    icon={<EditIcon />}
                    {...getEditButtonProps()}
                />
            </Flex>
        );
    }

    return (
        <Editable
            display="flex"
            marginLeft="10px"
            justifyContent="space-between"
            alignItems="center"
            defaultValue={content as string}
            fontSize={isTitle ? "3xl" : "xl"}
            isPreviewFocusable={false}
            color={isTitle ? "blackAlpha.900" : "grayAlpha.900"}
        >
            <EditablePreview />
            {/* Here is the custom input */}
            {isTitle ? (
                <Input as={EditableInput} />
            ) : (
                <Input height="100px" as={EditableTextarea} />
            )}

            <EditableControls />
        </Editable>
    );
}
