import {
    Box,
    ChakraProvider,
    HStack,
    Radio,
    RadioGroup,
    useRadio,
    useRadioGroup,
} from "@chakra-ui/react";
export default function CustomRadio(props) {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                p="2px 10px"
                rounded="md"
                cursor="pointer"
                color="black"
                bg="gray.300"
                {...checkbox}
                _checked={{ bg: "gray.700", color: "white" }}
            >
                {props.children}
            </Box>
        </Box>
    );
}
