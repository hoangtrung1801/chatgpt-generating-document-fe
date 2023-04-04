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
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from "@chakra-ui/react";
import TodosTab from "components/result/TodosTab";
import useBriefs from "lib/hooks/useGetBriefs";
import useUserStoriesOfSelection from "lib/hooks/useUserStoriesOfSelection";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import useUserStoriesStore from "stores/useUserStoriesStore";

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

const DocumentPage: NextPage = () => {
    const [isActive, setIsActive] = useState(0);
    const [brief, setBrief] = useState(undefined);

    const router = useRouter();
    const documentId = Number(router.query.documentId);

    const { briefs, isLoading: isBriefsLoading } = useBriefs();
    const { userStories, isUserStoriesLoading } =
        useUserStoriesOfSelection(documentId);

    // console.log(userStories);
    const { userStories: userStoriesStore, setUserStories } =
        useUserStoriesStore();

    useEffect(() => {
        if (userStories) {
            setUserStories(userStories);
        }
        if (brief === undefined && briefs) {
            console.log(
                "briefs",
                briefs,
                briefs.find((brief: any) => brief.id === documentId)
            );
            setBrief(
                briefs.find((brief: any) => brief.selectionId === documentId)
            );
        }
    }, [brief, briefs, documentId, setUserStories, userStories]);

    return (
        <>
            <Flex h="100vh">
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
                                <ReactMarkdown className="markdown">
                                    {brief && brief.answer}
                                </ReactMarkdown>
                            </TabPanel>
                            <TabPanel>
                                {userStoriesStore && (
                                    <TodosTab userStories={userStoriesStore} />
                                )}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Flex>
            </Flex>
        </>
    );
};

export default DocumentPage;
