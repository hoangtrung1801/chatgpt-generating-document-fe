import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import { BgCreateProjectIcon, HomeIcon } from "icons";
import React from "react";

type Props = {
    children: React.ReactElement;
};

export const LayoutCreateProject = ({ children }: Props) => {
    return (
        <Box>
            <Flex flexDir="column">
                <Flex
                    justify="center"
                    align="center"
                    inset={0}
                    pos="fixed"
                    w="100%"
                    h="100%"
                    bgImage="linear-gradient(to bottom, #fde6e1, #fffae8)"
                >
                    <Icon as={BgCreateProjectIcon} w="400px" h="400px" />
                </Flex>
                <Flex gap={1} p="8px">
                    <Icon as={HomeIcon} />
                    <Text>Home</Text>
                </Flex>
                {/* render step... */}
                <Flex w="full" minH="full" justify="center">
                    {children}
                </Flex>
            </Flex>
        </Box>
    );
};
