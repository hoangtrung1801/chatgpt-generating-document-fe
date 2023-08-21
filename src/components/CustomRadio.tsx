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
    const { getInputProps, getRadioProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getRadioProps();

    return (
        <Box as="label">
            <input {...input} />
            <Box
                {...checkbox}
                p="2px 10px"
                rounded="md"
                cursor="pointer"
                color="black"
                _checked={{
                    bg: "teal.600",
                    color: "white",
                    borderColor: "teal.600",
                }}
                _focus={{
                    boxShadow: "outline",
                }}
            >
                {props.children}
            </Box>
        </Box>
    );
}
