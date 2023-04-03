import {
    AddIcon,
    AttachmentIcon,
    CalendarIcon,
    EmailIcon,
    HamburgerIcon,
} from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Heading,
    Icon,
    Tab,
    Table,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack,
} from "@chakra-ui/react";
import TodosTab from "components/result/TodosTab";
import useBriefs from "lib/hooks/useGetBriefs";
import { Fragment, useEffect, useState } from "react";
import useResultStore from "stores/useResultStore";
import useUSerStoreState from "stores/useUserInfo";
import Testing1 from "components/result/TodosTab";
import useGetTodos from "lib/hooks/useGetTodos";
import useTodoStoreStore from "stores/useTodosStore";
import getResult from "lib/api/getResult";
import getTodos from "lib/api/getTodos";
import useGetUser from "lib/hooks/useGetSelection";
import Loading from "components/Loading";
import ReactMarkdown from "react-markdown";
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
        if (!userLoading) {
            getResult().then((res) => {
                setYourBriefs(res.data);
                console.log("user : ", user);
                // const selectionId = res.data[0].selectionId;
                const selectionId =
                    user.selections[user.selections.length - 1].id;
                console.log("selectionId", selectionId);
                getTodos(selectionId).then((todos) => {
                    setIsLoading(false);
                    console.log(todos.data);
                    setTodos(todos.data);
                });
            });
        }
    }, [isLoading, setTodos, user, userLoading]);

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
                                    <Table
                                        style={{
                                            borderCollapse: "separate",
                                            borderSpacing: "0 1em",
                                        }}
                                        variant="simple"
                                    >
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
                                                    DOCUMENTS
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
                                                            <Td minW="120px">
                                                                {_index + 1}
                                                            </Td>
                                                            <Td minW="120px">
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
                                        </Tbody>
                                    </Table>
                                    {/* </TableContainer> */}
                                </TabPanel>
                                <TabPanel>
                                    <TodosTab />
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
