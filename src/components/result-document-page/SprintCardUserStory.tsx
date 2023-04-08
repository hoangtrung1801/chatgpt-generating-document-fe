import { Box, Text } from "@chakra-ui/react";

interface SprintCardBodyProps {
    userStory: any;
}

const SprintCardUserStory = ({ userStory }: SprintCardBodyProps) => {
    return (
        <Box>
            <Text>{userStory.title}</Text>
        </Box>
    );
};

export default SprintCardUserStory;
