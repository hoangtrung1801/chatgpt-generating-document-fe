import { Box, Button } from "@chakra-ui/react";
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
            <Button
                isLoading
                loadingText="Loading"
                colorScheme="teal"
                variant="outlined"
                spinnerPlacement="end"
            ></Button>
        </Box>
    );
}

export default Loading;
