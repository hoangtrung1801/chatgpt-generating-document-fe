import { Box, Button, Stack, Icon, Flex } from "@chakra-ui/react";
import { documentModes } from "components/create-project/data";
import { CheckIcon } from "icons";
import React from "react";
import { UseFormReturn } from "react-hook-form";

export type TCardModeProps = {
    form: UseFormReturn<any>;
    mode: documentModes;
    title: string;
    imageUrl: string;
};

const bgMapping = {
    1: "rgb(204, 165, 218)",
    2: "rgb(244, 225, 200)",
};
const CardMode = ({ form, imageUrl, mode, title }: TCardModeProps) => {
    const { setValue, watch } = form;
    const [documentMode] = watch(["documentMode"]);
    const isActive = mode === documentMode;
    return (
        <Stack
            transitionProperty="filter, transform, border"
            transitionDuration="1000ms, 500ms, 400ms"
            onClick={() => {
                setValue("documentMode", mode);
                setValue("step", 1);
            }}
            filter={`${
                documentMode !== 0
                    ? isActive
                        ? ""
                        : "saturate(0.1) contrast(0.8)"
                    : ""
            }`}
            p={2}
            cursor="pointer"
            rounded="md"
            bg={`${
                documentMode !== 0
                    ? isActive
                        ? bgMapping[mode]
                        : "rgb(222, 193, 209)"
                    : bgMapping[mode]
            }`}
            w="100%"
            h="16rem"
            boxShadow="xl"
            _hover={{
                transform: "scale(1.03)",
            }}
            borderColor={`${isActive && "#C479DF"} `}
            borderWidth={"4px"}
        >
            <Box
                pos="relative"
                flex={1}
                bg={`url(${imageUrl}) center center / auto 100% no-repeat`}
            >
                {isActive && (
                    <Flex
                        pos="absolute"
                        rounded="full"
                        justify="center"
                        align="center"
                        top="50%"
                        right="50%"
                        bg="white"
                        transform="translate(50%, -50%) scale(1)"
                        w="12"
                        h="12"
                        boxShadow="md"
                        borderWidth="2px"
                        borderColor="rgb(204, 165, 218)"
                    >
                        <Icon as={CheckIcon} color="black" />
                    </Flex>
                )}
            </Box>

            <Button
                bg="blackAlpha.400"
                backdropFilter="saturate(200%)"
                color="white"
            >
                {title}
            </Button>
        </Stack>
    );
};

export default CardMode;
