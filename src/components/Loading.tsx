import { Box, Button, Spinner, Text, VStack } from "@chakra-ui/react";
import React from "react";

type Props = {
    isLoading: boolean;
};
function Loading() {
    return (
        <Box
            w="100%"
            h="70vh"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <VStack gap={6}>
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                />
                <Text textAlign="center" maxW="600px" fontSize="xl">
                    One moment, please. The feature list of Application you have
                    selected is being created
                </Text>
            </VStack>
        </Box>
    );
}

export default Loading;
