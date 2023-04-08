import { HamburgerIcon } from "@chakra-ui/icons";
import {
    Box,
    Flex,
    Heading,
    Icon,
    Show,
    Skeleton,
    SkeletonText,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from "@chakra-ui/react";
import BacklogTab from "components/result-document-page/BacklogTab";
import EpicTab from "components/result-document-page/EpicTab";
import LeftDashBoardMobile from "components/result-document-page/LeftDashBoardMobile";
import TodosTab from "components/result-document-page/TodosTab";
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
    // {
    //     content: "Todos",
    //     icon: AddIcon,
    // },
];

const TabTopTitle = [
    {
        content: "Vision and Goals",
    },
    {
        content: "Board",
    },
    {
        content: "Backlog",
    },
    {
        content: "Epic",
    },
];

const DocumentPage: NextPage = () => {
    const [isActive, setIsActive] = useState(0);
    const [brief, setBrief] = useState(undefined);
    const [isShow, setIsShow] = useState(false);

    const router = useRouter();
    const documentId = Number(router.query.documentId);

    const { briefs, isLoading: isBriefsLoading } = useBriefs();
    const { userStories, isUserStoriesLoading } =
        useUserStoriesOfSelection(documentId);

    // console.log(userStories);
    const {
        userStories: userStoriesStore,
        setUserStories,
        flag,
        setFlag,
    } = useUserStoriesStore();

    useEffect(() => {
        if (userStories) {
            setUserStories(userStories);
            // setFlag(true);
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
    }, [brief, briefs, documentId, flag, setFlag, setUserStories, userStories]);

    return (
        <Flex h="100vh">
            <Show above="sm">
                {/* column 1 */}
                <Flex
                    bg="#090c10"
                    color="white"
                    w={["0", "200px", "250px", "350px"]}
                    gap={5}
                    px={[0, 5]}
                    flexDir="column"
                >
                    <VStack
                        rounded="md"
                        border="1px"
                        borderColor="white"
                        alignItems="flex-start"
                        gap={2}
                        display={["none", "block"]}
                        p={["0 0", "20px 20px"]}
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
            </Show>
            {/* <Show below="md"> */}

            <LeftDashBoardMobile isShow={isShow} setIsShow={setIsShow} />

            <Flex
                bg="#1a202c"
                color="white"
                h="100vh"
                overflow="auto"
                p="0 30px"
                gap={5}
                flex={1}
                w="full"
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
                        <TabPanel mt={4}>
                            {isBriefsLoading ? (
                                <SkeletonText
                                    noOfLines={20}
                                    spacing="4"
                                    // skeletonHeight="2"
                                />
                            ) : (
                                <ReactMarkdown className="markdown">
                                    {brief?.answer}
                                </ReactMarkdown>
                            )}
                        </TabPanel>
                        <TabPanel>
                            {isUserStoriesLoading ? (
                                <Flex
                                    justifyContent="center"
                                    height="100%"
                                    flexDir={["column", "column", "row", "row"]}
                                    gap={4}
                                >
                                    <Skeleton
                                        height="100vh"
                                        w={["100%", "100%", "100%", "25%"]}
                                    />
                                    <Skeleton
                                        height="100vh"
                                        w={["100%", "100%", "100%", "25%"]}
                                    />
                                    <Skeleton
                                        height="100vh"
                                        w={["100%", "100%", "100%", "25%"]}
                                    />
                                    <Skeleton
                                        height="100vh"
                                        w={["100%", "100%", "100%", "25%"]}
                                    />
                                </Flex>
                            ) : (
                                <TodosTab userStories={userStoriesStore} />
                            )}
                        </TabPanel>

                        <TabPanel>
                            <BacklogTab />
                        </TabPanel>

                        <TabPanel>
                            <EpicTab />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Flex>
        </Flex>
    );
};

export default DocumentPage;
