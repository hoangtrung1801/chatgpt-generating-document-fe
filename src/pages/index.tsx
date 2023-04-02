import {
    Box,
    Flex,
    Grid,
    GridItem,
    Heading,
    Text,
    Button,
    HStack,
    Spinner,
    VStack,
    useBreakpointValue,
    IconProps,
    Icon,
    Stack,
    Tooltip,
    Menu,
    MenuButton,
    MenuList,
    MenuGroup,
    MenuItem,
    MenuDivider,
    Avatar,
} from "@chakra-ui/react";
import Loading from "components/Loading";
import useBriefs from "lib/hooks/useGetBriefs";
import UseGetUser from "lib/hooks/useGetUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import useUSerStoreState from "stores/useUserInfo";

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
    const { user, isLoading, error } = UseGetUser(2);
    const { setSelectionID } = useUSerStoreState();
    // const isLoading = true;
    useEffect(() => {
        if (!isLoading) {
            const selections = user.selections.map(
                (item: any, _index: any) => item.id
            );
            setSelectionID(selections);
        }
    }, [isLoading, setSelectionID, user]);

    // const user = {
    //     name: "titus",
    // };
    return (
        <Box
            position="relative"
            margin="50px auto"
            maxWidth={"container.xl"}
            transition="0.5s ease-out"
            minHeight="70vh"
            w="full"
            // bg="blue.100"
            bg="#f8f8fb"
            p={8}
        >
            {isLoading ? (
                <Loading />
            ) : (
                <Flex flexDirection="column" gap={10}>
                    <HStack justifyContent="space-between">
                        <Text fontWeight="bold" fontSize="40px">
                            Welcome to CodeDocAI
                        </Text>
                        <Menu>
                            <MenuButton
                                as={Avatar}
                                cursor="pointer"
                                colorScheme="pink"
                            ></MenuButton>
                            <MenuList>
                                <MenuGroup fontSize="20px" title="Profile">
                                    <MenuItem>My Account</MenuItem>
                                    <MenuItem>Log out </MenuItem>
                                </MenuGroup>
                            </MenuList>
                        </Menu>
                    </HStack>
                    <Text fontSize="20px" fontWeight="bold">
                        Hi, {user.name}! Which function you want to use below?
                    </Text>
                    <HStack gap={8}>
                        <Button
                            zIndex="1"
                            size="lg"
                            onClick={() => router.push("/document")}
                            bgGradient="linear(to-r, blue.500,blue.300)"
                            color={"white"}
                            _hover={{
                                boxShadow: "xl",
                            }}
                        >
                            Generate document
                        </Button>
                        <Button
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
                    </HStack>
                    <Heading size="md">1. Your documents</Heading>
                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                        {documentList.map((item, _index) => (
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
            <Blur
                position={"absolute"}
                zIndex="0"
                top={0}
                left={0}
                style={{ filter: "blur(70px)" }}
            />
        </Box>
    );
};
export const Blur = (props: IconProps) => {
    return (
        <Icon
            width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
            zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {/* <circle cx="71" cy="61" r="111" fill="#F56565" />
            <circle cx="244" cy="106" r="139" fill="#ED64A6" />
            <circle cy="291" r="139" fill="#ED64A6" />
            <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" /> */}
            <circle cx="100" cy="61" r="111" fill="#4299E1" />
            {/* <circle cx="500" cy="106" r="139" fill="#4299E1" />  */}
            <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
        </Icon>
    );
};
export default HomePage;
