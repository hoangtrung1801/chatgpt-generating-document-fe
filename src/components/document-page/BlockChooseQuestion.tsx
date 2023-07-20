import { Box, Heading, VStack } from "@chakra-ui/react";
import Loading from "components/Loading";
import useGetQuestion from "lib/hooks/useGetQuestion";
import { MultiOptions, SingleOption } from "./components";

type TBlockChooseQuestion = {
    questionId: number;
};

export const BlockChooseQuestion = ({ questionId }: TBlockChooseQuestion) => {
    const { question, isLoading } = useGetQuestion(questionId);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box>
            <VStack spacing={[10, 16]}>
                <Heading>{question.name}</Heading>
                <Box maxH="250px" overflow="auto" w="full">
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
