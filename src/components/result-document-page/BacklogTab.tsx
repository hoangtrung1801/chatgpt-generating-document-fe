import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Heading,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import useSelection from "lib/hooks/useSelection";
import useUserStoriesOfSelection from "lib/hooks/useUserStoriesOfSelection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateSprintModal from "./CreateSprintModal";
import SprintCard from "./SprintCard";
import SprintCardUserStory from "./SprintCardUserStory";

const BacklogTab = () => {
    const router = useRouter();
    const documentId = Number(router.query.documentId);

    const [sprints, setSprints] = useState([]);
    const [backlog, setBacklog] = useState<any>({});

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { selection, isSelectionLoading } = useSelection(documentId);
    const { userStories, isUserStoriesLoading } =
        useUserStoriesOfSelection(documentId);

    useEffect(() => {
        if (!isSelectionLoading && selection) {
            setSprints(selection.sprint);

            console.log("selection", selection);
        }
    }, [isSelectionLoading, isUserStoriesLoading, selection, userStories]);

    useEffect(() => {
        if (!isUserStoriesLoading && userStories) {
            setBacklog({
                name: "Backlog",
                userStories: userStories.filter(
                    (userStory) => userStory.sprintId === null
                ),
            });
        }
    }, [isUserStoriesLoading, userStories]);

    useEffect(() => {
        console.log("backlog", backlog);
    }, [backlog]);

    return (
        <Stack direction={"column"} spacing={4}>
            <Box>
                <Button
                    leftIcon={<AddIcon />}
                    onClick={onOpen}
                    colorScheme="blue"
                >
                    Create sprint
                </Button>
            </Box>
            <Stack direction={"column"} spacing={4}>
                {sprints &&
                    sprints.map((sprint) => (
                        <SprintCard key={sprint.id} sprint={sprint} />
                    ))}

                {/* {Object.keys(backlog).length > 0 && (
                    <SprintCard sprint={backlog} />
                )} */}
                {Object.keys(backlog).length > 0 && (
                    <Card colorScheme={"gray"}>
                        <CardHeader>
                            <Heading size="md">{backlog.name}</Heading>
                        </CardHeader>

                        <CardBody>
                            <Stack divider={<Divider />} spacing={4}>
                                {backlog?.userStories.map((userStory: any) => (
                                    <SprintCardUserStory
                                        key={userStory.id}
                                        userStory={userStory}
                                    />
                                ))}
                            </Stack>
                        </CardBody>
                    </Card>
                )}
            </Stack>

            <CreateSprintModal isOpen={isOpen} onClose={onClose} />
        </Stack>
    );
};

export default BacklogTab;
