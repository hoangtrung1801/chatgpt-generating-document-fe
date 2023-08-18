import { Box, Flex, Text, Icon, Button } from "@chakra-ui/react";
import { BgCreateProjectIcon, HomeIcon } from "icons";
import { useRouter } from "next/router";
import React from "react";

type Props = {
    children: React.ReactElement;
};

export const LayoutCreateProject = ({ children }: Props) => {
    const router = useRouter();
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
                <Flex zIndex={2} gap={1} p="18px">
                    <Button
                        onClick={() => router.push("/")}
                        px={4}
                        color="gray.800"
                        fontSize="sm"
                        w="fit-content"
                        height={8}
                        fontWeight="700"
                        borderColor="gray-200"
                        borderRadius="full"
                        bgColor="white"
                        _hover={{
                            color: "blue",
                        }}
                        leftIcon={<Icon as={HomeIcon} />}
                    >
                        Home
                    </Button>
                </Flex>
                {/* render step... */}
                <Flex w="full" minH="full" justify="center">
                    {children}
                </Flex>
            </Flex>
        </Box>
    );
};
