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
    Text,
    Th,
    Thead,
    Tr,
    VStack,
} from "@chakra-ui/react";
import TodosTab from "components/result/TodosTab";
import useBriefs from "lib/hooks/useGetBriefs";
import { useState } from "react";
import useResultStore from "stores/useResultStore";
import useUSerStoreState from "stores/useUserInfo";
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
    const { selectionID } = useUSerStoreState();
    const { briefs, isLoading } = useBriefs(); // all
    const [yourBiefs, setYourBriefs] = useState<any[]>([]);
    const result = useResultStore((state) => state.result);

    // const { user, isLoading : userLoading, error } = UseGetUser(2);

    // useEffect(() => {
    //     if (!isLoading) {
    //         const filteredBriefs = briefs.filter((brief: any) =>
    //             selectionID.includes(brief.selectionId)
    //         );
    //         // setYourBriefs(filteredBriefs);
    //         if (Object.keys(result).length > 0) {
    //             console.log("result : ", result);
    //             setYourBriefs([...filteredBriefs, result]);
    //         } else {
    //             setYourBriefs(filteredBriefs);
    //         }
    //         console.log("filteredBriefs : ", filteredBriefs);
    //     }
    // }, [briefs, isLoading, result, selectionID]);
    // console.log("yourBiefs : ", yourBiefs);

    return (
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
                                        <Th color="white" fontSize="medium">
                                            Order
                                        </Th>
                                        <Th color="white" fontSize="medium">
                                            ID
                                        </Th>
                                        <Th color="white" fontSize="medium">
                                            TODO
                                        </Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
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
                            <TodosTab />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    );
}

export default Result;
