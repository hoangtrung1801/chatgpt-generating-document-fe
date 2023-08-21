import { Box, Flex, Icon, RadioProps, useRadio } from "@chakra-ui/react";
import {
    CustomRadioIconUnChecked,
    CustomRadioIconUnCheckedChecked,
} from "icons";

export interface CustomRadioProps extends RadioProps {}
export function CustomRadio(CustomRadioProps) {
    const {
        getRadioProps,
        getInputProps,
        state: { isChecked },
    } = useRadio(CustomRadioProps);
    const input = getInputProps();
    const radio = getRadioProps({ isChecked });
    return (
        <Box w="fit-content" as="label">
            <input {...input} />

            <Flex
                align="center"
                justify="space-between"
                // h="105px"
                // w="242px"
                // p="24px 30px"
                // h="105px"
                // w="242px"
                p="12px 24px"
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
                {CustomRadioProps.children}
                {isChecked ? (
                    <Icon
                        // w="58px"
                        // h="58px"
                        ml={2}
                        rounded="full"
                        as={CustomRadioIconUnCheckedChecked}
                    />
                ) : (
                    <Icon
                        // w="58px"
                        // h="58px"
                        ml={2}
                        rounded="full"
                        border="1.9px solid #949ca8"
                        as={CustomRadioIconUnChecked}
                    />
                )}
            </Flex>
        </Box>
    );
}
