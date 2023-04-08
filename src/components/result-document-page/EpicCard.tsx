import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Heading,
    Stack,
} from "@chakra-ui/react";
import useEpic from "lib/hooks/useEpic";
import useSprint from "lib/hooks/useSprint";
import SprintCardUserStory from "./SprintCardUserStory";

interface EpicCardProps {
    epic: any;
}

const EpicCard = ({ epic: epicProp }: EpicCardProps) => {
    const { epic, isLoading: isEpicLoading } = useEpic(epicProp.id);
    console.log("sprint", epic);

    if (isEpicLoading) return <Box>Loading...</Box>;

    return (
        <Card colorScheme={"gray"}>
            <CardHeader>
                <Heading size="md">{epic.title}</Heading>
            </CardHeader>

            <CardBody>
                <Stack divider={<Divider />} spacing={4}>
                    {/* {sprint.userStories.map((userStory: any) => (
                        <SprintCardUserStory
                            key={userStory.id}
                            userStory={userStory}
                        />
                    ))} */}
                    {!isEpicLoading &&
                        epic &&
                        epic.userStories.map((userStory: any) => (
                            <SprintCardUserStory
                                key={userStory.id}
                                userStory={userStory}
                            />
                        ))}
                </Stack>
            </CardBody>
        </Card>
    );
};

export default EpicCard;
