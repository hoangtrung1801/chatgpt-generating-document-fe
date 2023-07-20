import { Box, Flex, Icon, useRadio } from "@chakra-ui/react";
import {
    CustomRadioIconUnChecked,
    CustomRadioIconUnCheckedChecked,
} from "icons";

export function CustomRadio(props) {
    const {
        getRadioProps,
        getInputProps,
        getCheckboxProps,
        state: { isChecked },
    } = useRadio(props);
    const input = getInputProps();
    const radio = getRadioProps({ isChecked });

    return (
        <Box w="fit-content" as="label">
            <input {...input} />

            <Flex
                align="center"
                justify="space-between"
                h="105px"
                w="242px"
                p="24px 30px"
                border="2px solid #949ca8"
                borderRadius="17.3px"
                textAlign="center"
                fontSize="22px"
                fontWeight="bold"
                {...radio}
                transition="all .5s ease-in-out"
                _checked={{
                    borderColor: "#06f",
                    backgroundColor: "rgba(0,102,255,.1)",
                }}
            >
                {props.children}
                {isChecked ? (
                    <Icon
                        w="58px"
                        h="58px"
                        rounded="full"
                        as={CustomRadioIconUnCheckedChecked}
                    />
                ) : (
                    <Icon
                        w="58px"
                        h="58px"
                        rounded="full"
                        border="1.9px solid #949ca8"
                        as={CustomRadioIconUnChecked}
                    />
                )}
            </Flex>
        </Box>
    );
}
