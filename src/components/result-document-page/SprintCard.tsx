import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Heading,
    Stack,
} from "@chakra-ui/react";
import useSprint from "lib/hooks/useSprint";
import SprintCardUserStory from "./SprintCardUserStory";

interface SprintCardProps {
    sprint: any;
}

const SprintCard = ({ sprint: sprintProp }: SprintCardProps) => {
    const { sprint, isSprintLoading } = useSprint(sprintProp.id);
    console.log("sprint", sprint);

    if (isSprintLoading) return <Box>Loading...</Box>;

    return (
        <Card colorScheme={"gray"}>
            <CardHeader>
                <Heading size="md">{sprint.name}</Heading>
            </CardHeader>

            <CardBody>
                <Stack divider={<Divider />} spacing={4}>
                    {/* {sprint.userStories.map((userStory: any) => (
                        <SprintCardUserStory
                            key={userStory.id}
                            userStory={userStory}
                        />
                    ))} */}
                    {!isSprintLoading &&
                        sprint &&
                        sprint.userStories.map((userStory: any) => (
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

export default SprintCard;
