import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { boxQAMotion } from "components/motion";
import MotionBox from "components/motion/Box";
import useGetQuestions from "lib/hooks/useGetQuestions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BlockChooseQuestion } from "./BlockChooseQuestion";
import { LayoutGenerate } from "./components";
import { checkEmptyOption } from "./data";
type TChooseAppOptions = {
    nextStep: () => void;
    backStep: () => void;
};

export const ChooseAppOptions = ({ nextStep, backStep }: TChooseAppOptions) => {
    const router = useRouter();
    const step = Number(router.query.step);

    const [continuationEnablement, setContinuationEnablement] = useState(false);

    const { watch } = useFormContext();
    const [appId, selectedOptions] = watch(["appId", "selectedOptions"]);

    const { questions, isLoading: questionsIsLoading } = useGetQuestions(appId);

    // check empty options
    useEffect(() => {
        if (step >= 3 && step - 3 < questions.length) {
            checkEmptyOption(selectedOptions, questions[step - 3].id)
                ? setContinuationEnablement(false)
                : setContinuationEnablement(true);
        }
    }, [questions, selectedOptions, step]);

    return (
        <LayoutGenerate
            questionsLength={questions.length}
            continueButton={
                <Button
                    isDisabled={!continuationEnablement}
                    onClick={nextStep}
                    maxW="200px"
                    variant="secondary"
                >
                    <Text>Continue</Text>
                </Button>
            }
            backAction={backStep}
        >
            <Box flex={1}>
                {!questionsIsLoading && (
                    <Stack>
                        {questions.map((question, id) => (
                            <MotionBox
                                flex={1}
                                key={id}
                                variants={boxQAMotion}
                                initial="hidden"
                                animate={step - 3 === id ? "visible" : "hidden"}
                                transition={{ duration: 0.6 }}
                            >
                                <Box flex={1} key={id} hidden={step - 3 !== id}>
                                    <BlockChooseQuestion
                                        questionId={question.id}
                                    />
                                </Box>
                            </MotionBox>
                        ))}
                    </Stack>
                )}
            </Box>
        </LayoutGenerate>
    );
};
