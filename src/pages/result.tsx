import {
    Box,
    Flex,
    Heading,
    HStack,
    Radio,
    Tab,
    Table,
    TableCaption,
    TableContainer,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    Icon,
    VStack,
    Button,
    Center,
} from "@chakra-ui/react";
import {
    HamburgerIcon,
    AddIcon,
    CalendarIcon,
    EmailIcon,
    AttachmentIcon,
} from "@chakra-ui/icons";
import ThemeToggle from "../lib/layout/ThemeToggle";
import React, { Fragment, useEffect, useState } from "react";
import useGetUser from "lib/hooks/useGetUser";
import useUSerStoreState from "stores/useUserInfo";
import useBriefs from "lib/hooks/useGetBriefs";
import ReactMarkdown from "react-markdown";
import Loading from "components/Loading";
import useResultStore from "stores/useResultStore";
import Testing1 from "components/result/TodosTab";
import TodosTab from "components/result/TodosTab";
import useGetTodos from "lib/hooks/useGetTodos";
import useTodoStoreStore from "stores/useTodosStore";
import getResult from "lib/api/getResult";
import getTodos from "lib/api/getTodos";
const TabLeftTitle = [
    {
        content: "Documents",
        icon: HamburgerIcon,
    },
    {
        content: "Logo",
        icon: AddIcon,
    },
    {
        content: "SOP & Document",
        icon: CalendarIcon,
    },
    {
        content: "Assistant",
        icon: EmailIcon,
    },
    {
        content: "BLacklogs",
        icon: AttachmentIcon,
    },
];

const TabTopTitle = [
    {
        content: "Vision and Goals",
    },
    {
        content: "Todos",
    },
    {
        content: "Project Roadmap",
    },
    {
        content: "Project Boards",
    },
];

function Result() {
    const [isActive, setIsActive] = useState(0);
    const { user, isLoading: userLoading } = useGetUser();
    const [isLoading, setIsLoading] = useState(true);
    // const { briefs, isLoading } = useBriefs();
    const [yourBiefs, setYourBriefs] = useState<any[]>([]);
    const result = useResultStore((state) => state.result);
    // const { todos } = useGetTodos(result.id);
    const { setTodos, todos } = useTodoStoreStore();

    // const { user, isLoading : userLoading, error } = UseGetUser(2);

    useEffect(() => {
        getResult().then((res) => {
            setYourBriefs(res.data);
            const selectionId = res.data[0].selectionId;
            getTodos(selectionId).then((todos) => {
                setIsLoading(false);
                setTodos(todos.data);
            });
        });
        // getResult().then(
        //     (res) => {
        //         setYourBriefs(res.data);
        //         const selectionId = res.data[0].selectionId;
        //         setIsLoading(false);
        //         getTodos(selectionId).then((todos) => {
        //             console.log("todos : ", todos);
        //             setIsLoading(false);
        //         });
        //     }
        // eslint-disable-next-line react-hooks/rules-of-hooks
    }, [isLoading, setTodos]);
    // if (!isLoading) {
    //     const filteredBriefs = briefs.filter((brief: any) =>
    //         user.selections.includes(brief.selectionId)
    //     );
    //     // setYourBriefs(filteredBriefs);
    //     if (Object.keys(result).length > 0) {
    //         console.log("result : ", result);
    //         setYourBriefs([...filteredBriefs, result]);
    //         getTodos(user.selectionId).then((todos) => {
    //             console.log("todos : ", todos);
    //         });
    //     } else {
    //         getTodos(user.selectionId).then((todos) => {
    //             console.log("todos : ", todos);
    //         });
    //         setYourBriefs(filteredBriefs);
    //     }
    //     console.log("filteredBriefs : ", filteredBriefs);
    // }

    return (
        <Fragment>
            {isLoading ? (
                <Loading />
            ) : (
                <Flex h="100vh">
                    {/* column 1 */}
                    <Flex
                        bg="#090c10"
                        color="white"
                        minW="350px"
                        gap={5}
                        px={5}
                        flexDir="column"
                    >
                        <VStack
                            rounded="md"
                            border="1px"
                            borderColor="white"
                            alignItems="flex-start"
                            gap={2}
                            p="20px 20px"
                            mt="80px"
                        >
                            <Text fontSize={"xl"} fontWeight="bold">
                                Welcome to CodeDocAI
                            </Text>
                        </VStack>
                        <Flex gap={3} flexDirection="column">
                            {TabLeftTitle.map((item, _index) => (
                                <Box
                                    display="flex"
                                    gap="10px"
                                    alignItems="center"
                                    cursor="pointer"
                                    key={item.content}
                                    bg={
                                        isActive === _index
                                            ? "whiteAlpha.200"
                                            : "transparent"
                                    }
                                    _hover={{
                                        bg: "whiteAlpha.200",
                                    }}
                                    p={4}
                                    rounded="lg"
                                    onClick={() => setIsActive(_index)}
                                >
                                    <Icon w="19px" h="19px" as={item.icon} />
                                    <Text>{item.content}</Text>
                                </Box>
                            ))}
                        </Flex>
                    </Flex>
                    {/* column 2 */}
                    <Flex
                        bg="#1a202c"
                        color="white"
                        h="100vh"
                        overflow="auto"
                        p="0 30px"
                        gap={5}
                        flex={1}
                        flexDirection="column"
                    >
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Heading mt="20px" as="h1" size="5xl" noOfLines={1}>
                                Overview
                            </Heading>
                            {/* <ThemeToggle /> */}
                        </Box>
                        <Tabs isFitted variant="soft-rounded">
                            <TabList>
                                {TabTopTitle.map((title) => (
                                    <Tab
                                        _selected={{
                                            color: "white",
                                            bg: "blackAlpha.600",
                                        }}
                                        key={title.content}
                                        p="15px"
                                    >
                                        {title.content}
                                    </Tab>
                                ))}
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    {/* <TableContainer overflowWrap="normal"> */}
                                    <Table
                                        style={{
                                            borderCollapse: "separate",
                                            borderSpacing: "0 1em",
                                        }}
                                        variant="simple"
                                    >
                                        {/* <TableCaption>
                                        Imperial to metric conversion factors
                                    </TableCaption> */}
                                        <Thead>
                                            <Tr h="100px">
                                                <Th
                                                    color="white"
                                                    fontSize="medium"
                                                >
                                                    Order
                                                </Th>
                                                <Th
                                                    color="white"
                                                    fontSize="medium"
                                                >
                                                    ID
                                                </Th>
                                                <Th
                                                    color="white"
                                                    fontSize="medium"
                                                >
                                                    TODO
                                                </Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            <Fragment>
                                                {yourBiefs.map(
                                                    (
                                                        brief: any,
                                                        _index: number
                                                    ) => (
                                                        <Tr key={brief.id}>
                                                            <Td minW="150px">
                                                                {_index + 1}
                                                            </Td>
                                                            <Td minW="150px">
                                                                {brief.id}
                                                            </Td>
                                                            <Td>
                                                                <ReactMarkdown className="markdown">
                                                                    {
                                                                        brief.answer
                                                                    }
                                                                </ReactMarkdown>
                                                            </Td>
                                                        </Tr>
                                                    )
                                                )}
                                            </Fragment>
                                            {/* {isLoading ? (
                                        <Box flex={1} display="flex" w="100%">
                                            <Button
                                                isLoading
                                                loadingText="Loading"
                                                colorScheme="blue"
                                                variant="outline"
                                                spinnerPlacement="end"
                                            ></Button>
                                        </Box>
                                    ) : (
                                        <Fragment>
                                            {yourBiefs.map(
                                                (
                                                    brief: any,
                                                    _index: number
                                                ) => (
                                                    <Tr key={brief.id}>
                                                        <Td minW="150px">
                                                            {_index + 1}
                                                        </Td>
                                                        <Td minW="150px">
                                                            {brief.id}
                                                        </Td>
                                                        <Td>
                                                            <ReactMarkdown className="markdown">
                                                                {brief.answer}
                                                            </ReactMarkdown>
                                                        </Td>
                                                    </Tr>
                                                )
                                            )}
                                        </Fragment>
                                    )} */}
                                        </Tbody>
                                    </Table>
                                    {/* </TableContainer> */}
                                </TabPanel>
                                <TabPanel>
                                    <TodosTab todos={todos} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Flex>
                </Flex>
            )}
        </Fragment>
    );
}

export default Result;
