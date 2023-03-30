import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text,
    Button,
    HStack,
} from "@chakra-ui/react";
import UseGetUser from "lib/hooks/useGetUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const documentList = [
    {
        name: "Document 1",
    },
    {
        name: "Document 2",
    },
    {
        name: "Document 3",
    },
];
const HomePage: NextPage = () => {
    const router = useRouter();
    // const { user, isLoading, error } = UseGetUser(4);
    const isLoading = false;
    const user = {
        name: "titus",
    };
    return (
        <Box
            margin="50px auto"
            maxWidth={"container.xl"}
            transition="0.5s ease-out"
            minHeight="70vh"
            w="full"
            bg="blue.100"
            p={8}
        >
            {isLoading ? (
                <Box
                    w="100%"
                    h="70vh"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        isLoading
                        loadingText="Loading"
                        colorScheme="teal"
                        variant="outline"
                        spinnerPlacement="end"
                    ></Button>
                </Box>
            ) : (
                <Flex flexDirection="column" gap={10}>
                    <Heading>Welcome to CodeDocAI</Heading>
                    <Text fontWeight="bold">
                        Hi, {user.name}! Which function you want to use below?
                    </Text>
                    <HStack gap={8}>
                        <Button
                            size="lg"
                            bg="blue.100"
                            onClick={() => router.push("/document")}
                        >
                            Generate document
                        </Button>
                        <Button size="lg" bg="blue.100">
                            Generate code project
                        </Button>
                    </HStack>
                    <Heading size="md">1. Your documents</Heading>
                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                        {documentList.map((item, index) => (
                            <GridItem
                                key={item.name}
                                p={4}
                                borderRadius={12}
                                cursor="pointer"
                                fontWeight="bold"
                                _hover={{
                                    bg: "blue.400",
                                    color: "white",
                                }}
                                w="100%"
                                h="300"
                                bg="blue.100"
                            >
                                {item.name}
                            </GridItem>
                        ))}
                    </Grid>
                    <Heading size="md">2. Your code projects</Heading>
                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                        <GridItem
                            p={4}
                            borderRadius={12}
                            cursor="pointer"
                            fontWeight="bold"
                            _hover={{
                                bg: "blue.400",
                                color: "white",
                            }}
                            w="100%"
                            h="300"
                            bg="blue.100"
                        >
                            Code 1
                        </GridItem>
                    </Grid>
                </Flex>
            )}
        </Box>
    );
};
export default HomePage;
