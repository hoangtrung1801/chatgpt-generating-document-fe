import { Box, BoxProps, Stack, Text, VStack } from "@chakra-ui/react";
import Loading from "components/Loading";
import useGetQuestion from "lib/hooks/useGetQuestion";
import { MultiOptions, SingleOption } from "./components";

interface TBlockChooseQuestion extends BoxProps {
    questionId: number;
}

export const BlockChooseQuestion = ({
    questionId,
    ...rest
}: TBlockChooseQuestion) => {
    const { question, isLoading } = useGetQuestion(questionId);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box minW="500px" {...rest}>
            <VStack w="full" spacing={[6, 6]}>
                <Text color="gray.500">{question.name}</Text>
                <Stack maxH="250px" overflow="auto" w="full">
                    {["SINGLE", "YESNO"].includes(question.type) && (
                        <SingleOption
                            questionId={question.id}
                            options={question.options}
                        />
                    )}

                    {question.type === "MULTI" && (
                        <MultiOptions
                            questionId={question.id}
                            options={question.options}
                        />
                    )}
                </Stack>
            </VStack>
        </Box>
    );
};
