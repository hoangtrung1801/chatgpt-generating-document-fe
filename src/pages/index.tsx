import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    IconProps,
    Skeleton,
    Stack,
    Text,
    useBreakpointValue,
    VStack,
} from "@chakra-ui/react";
import Loading from "components/Loading";
import useCurrentUser from "lib/hooks/useCurrentUser";
import useUserSelections from "lib/hooks/useUserSelections";
import Header from "lib/layout/Header";
import { NextPage } from "next";
import { useRouter } from "next/router";

const HomePage: NextPage = () => {
    const router = useRouter();

    const {
        currentUser,
        isLoading: isCurrentUserLoading,
        error,
    } = useCurrentUser();
    const { selections, isLoading: isUserSelectionLoading } =
        useUserSelections();

    console.log(selections, currentUser, error);

    return (
        <Box
            position="relative"
            margin="50px auto"
            maxWidth={"container.xl"}
            transition="0.5s ease-out"
            minHeight="70vh"
            w="full"
            // bg="#eaeaf1"
            // bg="blue.100"
            bg="#f8f8fb"
            p={8}
        >
            {/* userLoading && */}
            {isCurrentUserLoading ? (
                <Loading />
            ) : (
                <Flex flexDirection="column" gap={10}>
                    <Header />
                    <Text fontSize={["18px", "20px"]} fontWeight="bold">
                        Hi, {currentUser && currentUser.name}! Which function
                        you want to use below?
                    </Text>
                    <Stack
                        justifyContent={["center", "left"]}
                        alignItems="center"
                        flexDir={["column", "row"]}
                        gap={8}
                    >
                        <Button
                            zIndex="1"
                            size="lg"
                            onClick={() => router.push("/generate")}
                            bgGradient="linear(to-r, blue.500,blue.300)"
                            color={"white"}
                            _hover={{
                                boxShadow: "xl",
                            }}
                        >
                            Generate document
                        </Button>
                        <Button
                            mt={["0px !important"]}
                            size="lg"
                            zIndex="1"
                            bgGradient="linear(to-r, blue.500,blue.300)"
                            color={"white"}
                            _hover={{
                                boxShadow: "xl",
                            }}
                        >
                            Generate code project
                        </Button>
                    </Stack>
                    <Heading size="md">Your documents</Heading>
                    <Grid
                        templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}
                        gap={6}
                    >
                        {selections === undefined || isUserSelectionLoading ? (
                            Array(3)
                                .fill(0)
                                .map((_, index) => {
                                    return (
                                        <GridItem key={index}>
                                            <Skeleton
                                                p={4}
                                                borderRadius={12}
                                                cursor="pointer"
                                                fontWeight="bold"
                                                w="100%"
                                                h="300"
                                            />
                                        </GridItem>
                                    );
                                })
                        ) : (
                            <>
                                {selections.length === 0 ? (
                                    <Text>You have no documents yet!</Text>
                                ) : (
                                    <>
                                        {(selections as any[]).map(
                                            (selection) => (
                                                <GridItem
                                                    onClick={() => {
                                                        router.push(
                                                            `/result/documents/${selection.id}`
                                                        );
                                                    }}
                                                    key={selection.id}
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
                                                    {selection.title}
                                                </GridItem>
                                            )
                                        )}
                                    </>
                                )}
                            </>
                        )}
                    </Grid>
                    {/* <Heading size="md">2. Your code projects</Heading>
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
                    </Grid> */}
                </Flex>
            )}
            <Blur />
        </Box>
    );
};

export const Blur = (props: IconProps) => {
    return (
        <Icon
            width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
            // zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
            zIndex="-1"
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            position={"absolute"}
            top={`${Math.floor(Math.random() * 500)}px`}
            left={`${Math.floor(Math.random() * 500)}px`}
            style={{ filter: "blur(70px)" }}
        >
            {/* <circle cx="71" cy="61" r="111" fill="#F56565" />
            <circle cx="244" cy="106" r="139" fill="#ED64A6" />
            <circle cy="291" r="139" fill="#ED64A6" />
            <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" /> */}
            <circle cx="100" cy="61" r="111" fill="#4299E1" />
            {/* <circle cx="500" cy="106" r="139" fill="#4299E1" />  */}
            {/* <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" /> */}
        </Icon>
    );
};
export default HomePage;
