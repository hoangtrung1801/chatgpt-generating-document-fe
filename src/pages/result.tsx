import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import useResultStore from "stores/useResultStore";

function Result() {
    const result = useResultStore((state) => state.result);

    return (
        <Box>
            <HStack justify={"space-between"} alignItems="center">
                <Stack padding="4px 16px" bg="blackAlpha.300" borderRadius={12}>
                    {result !== undefined &&
                        result
                            .split("\n")
                            .map(
                                (item, index) =>
                                    index > 0 && <Text key={index}>{item}</Text>
                            )}
                </Stack>
            </HStack>
        </Box>
    );
}

export default Result;
