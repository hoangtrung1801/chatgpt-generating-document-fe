import {
    AddIcon,
    AttachmentIcon,
    CalendarIcon,
    EmailIcon,
    HamburgerIcon,
} from "@chakra-ui/icons";
import {
    Box,
    Button,
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
import Link from "next/link";
import { Fragment, useState } from "react";
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

    const { briefs, isLoading } = useBriefs();
    console.log("briefs : ", briefs);

    return (
        <Fragment>
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
                    <Table
                        style={{
                            borderCollapse: "separate",
                            borderSpacing: "0 1em",
                        }}
                        variant="simple"
                    >
                        <Thead>
                            <Tr h="100px">
                                <Th color="white" fontSize="medium">
                                    No.
                                </Th>
                                <Th color="white" fontSize="medium">
                                    ID
                                </Th>
                                <Th color="white" fontSize="medium">
                                    DOCUMENTS
                                </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Fragment>
                                {briefs &&
                                    briefs.map((brief: any, _index: number) => (
                                        <Tr key={brief.id}>
                                            <Td minW="120px">{_index + 1}</Td>
                                            <Td minW="120px">{brief.id}</Td>
                                            <Td>
                                                <Button
                                                    colorScheme={"blue"}
                                                    as={Link}
                                                    href={`/result/documents/${brief.selectionId}`}
                                                >
                                                    Watch document
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))}
                            </Fragment>
                        </Tbody>
                    </Table>
                </Flex>
            </Flex>
        </Fragment>
    );
}

export default Result;
