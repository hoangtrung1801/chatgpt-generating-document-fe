import { Box, BoxProps, Heading, Text, VStack } from "@chakra-ui/react";
import Loading from "components/Loading";
import useGetQuestion from "lib/hooks/useGetQuestion";
import { MultiOptions, SingleOption } from "./components";

interface TBlockChooseQuestionv2 extends BoxProps {
    questionId: number;
}

export const BlockChooseQuestionv2 = ({
    questionId,
    ...rest
}: TBlockChooseQuestionv2) => {
    const { question, isLoading } = useGetQuestion(questionId);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box minW="500px" {...rest}>
            <VStack w="full" spacing={[6, 6]}>
                <Text color="gray.500">{question.name}</Text>
                <Box
                    // borderWidth="1px"
                    // rounded="md"
                    // borderColor="gray.400"
                    maxH="250px"
                    overflow="auto"
                    w="full"
                >
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
                </Box>
            </VStack>
        </Box>
    );
};
