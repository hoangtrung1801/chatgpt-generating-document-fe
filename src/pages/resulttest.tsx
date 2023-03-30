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
} from "@chakra-ui/react";
import {
    HamburgerIcon,
    AddIcon,
    CalendarIcon,
    EmailIcon,
    AttachmentIcon,
} from "@chakra-ui/icons";
import ThemeToggle from "../lib/layout/ThemeToggle";
import React, { useState } from "react";
const fetchData = [
    {
        ID: "ID-1234",
        Order: 1,
        Todo: "orem Ipsum is simply sss sdsdsa dummy text of the printing and typesetting industry.",
    },
    {
        ID: "ID-1234",
        Order: 1,
        Todo: "orem Ipsum is simply sss sdsdsa dummy text of the printing and typesetting industry.",
    },
    {
        ID: "ID-2334",
        Order: 2,
        Todo: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
    {
        ID: "ID-5845",
        Order: 3,
        Todo: "when an unknown printer took a galley  It has survived not only five centuries,",
    },
    {
        ID: "ID-5843",
        Order: 4,
        Todo: "Letraset sheets containing Lorem Ipsum pageMaker including versions of Lorem Ipsum sheets containing Lorem Ipsum sheets containing Lorem Ipsum.",
    },
    {
        ID: "ID-5843",
        Order: 4,
        Todo: "Letraset sheets containing Lorem Ipsum pageMaker including versions of Lorem Ipsum sheets containing Lorem Ipsum sheets containing Lorem Ipsum.",
    },
];

const TabLeftTitle = [
    {
        content: "Overview",
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
        content: "To do of the day",
    },
    {
        content: "Project Roadmap",
    },
    {
        content: "Project Boards",
    },
];

function resulttest() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isActive, setIsActive] = useState(0);
    return (
        <Flex minH="100vh">
            {/* column 1 */}
            <Flex
                bg={"blackAlpha.700"}
                color="white"
                minW="400px"
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
                    {TabLeftTitle.map((item, index) => (
                        <Box
                            display="flex"
                            gap="10px"
                            alignItems="center"
                            cursor="pointer"
                            key={item.content}
                            bg={
                                isActive === index
                                    ? "blackAlpha.400"
                                    : "transparent"
                            }
                            _hover={{
                                bg: "blackAlpha.400",
                            }}
                            p={4}
                            rounded="lg"
                            onClick={() => setIsActive(index)}
                        >
                            <Icon w="19px" h="19px" as={item.icon} />
                            <Text>{item.content}</Text>
                        </Box>
                    ))}
                </Flex>
            </Flex>
            {/* column 2 */}
            <Flex p="0 30px" gap={5} flex={1} flexDirection="column">
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Heading mt="20px" as="h1" size="5xl" noOfLines={1}>
                        Overview
                    </Heading>
                    <ThemeToggle />
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
                            {/* <TableContainer overflowX="hidden"> */}
                            <Table variant="simple">
                                {/* <TableCaption>
                                        Imperial to metric conversion factors
                                    </TableCaption> */}
                                <Thead>
                                    <Tr h="100px">
                                        <Th fontSize="medium">Order</Th>
                                        <Th fontSize="medium">ID</Th>
                                        <Th fontSize="medium">TODO</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {fetchData.map((item) => (
                                        <Tr key={item.ID}>
                                            <Td minW="150px">{item.Order}</Td>
                                            <Td minW="150px">{item.ID}</Td>
                                            <Td>
                                                <Radio
                                                    size="lg"
                                                    value={item.Todo}
                                                    colorScheme="blue"
                                                >
                                                    <Text
                                                        ml="10px"
                                                        lineHeight="30px"
                                                    >
                                                        {item.Todo}
                                                    </Text>
                                                </Radio>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                            {/* </TableContainer> */}
                        </TabPanel>
                        <TabPanel>
                            <p>one!</p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    );
}

export default resulttest;