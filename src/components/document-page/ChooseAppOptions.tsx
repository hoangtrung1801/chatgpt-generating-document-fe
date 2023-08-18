import { Box, Button, Stack, Text, useDisclosure } from "@chakra-ui/react";
import { boxQAMotion } from "components/motion";
import MotionBox from "components/motion/Box";
import useGetQuestions from "lib/hooks/useGetQuestions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useCreateProject } from "stores";
import { BlockChooseQuestion } from "./BlockChooseQuestion";
import { LayoutGenerate } from "./components";
import { checkEmptyOption } from "./data";
import { PreviewDocument } from "./PreviewDocument";
type TChooseAppOptions = {
    nextStep: () => void;
    backStep: () => void;
};

export const ChooseAppOptions = ({ nextStep, backStep }: TChooseAppOptions) => {
    const ModalStatus = useDisclosure();
    const router = useRouter();
    const step = Number(router.query.step) || 0;
    const { appId } = useCreateProject((state) => state.data);

    const [continuationEnablement, setContinuationEnablement] = useState(false);

    const { watch } = useFormContext();
    const [selectedOptions] = watch(["selectedOptions"]);

    const { questions, isLoading: questionsIsLoading } = useGetQuestions(appId);
    console.log("questions:", questions);

    // check empty options
    useEffect(() => {
        if (step < questions.length) {
            checkEmptyOption(selectedOptions, questions[step].id)
                ? setContinuationEnablement(false)
                : setContinuationEnablement(true);
        }
    }, [questions, selectedOptions, step]);

    return (
        <LayoutGenerate
            createSectionButton={
                step === questions.length && (
                    <Button
                        onClick={() => ModalStatus.onOpen()}
                        maxW="200px"
                        variant="secondary"
                    >
                        <Text>Create section</Text>
                    </Button>
                )
            }
            questionsLength={questions.length}
            continueButton={
                <Button
                    isDisabled={!continuationEnablement}
                    onClick={nextStep}
                    maxW="200px"
                    variant="secondary"
                    bg="blue"
                >
                    <Text>Continue</Text>
                </Button>
            }
            backAction={backStep}
        >
            <Box color="black" flex={1}>
                {!questionsIsLoading && (
                    <Stack>
                        {questions.map((question, id) => (
                            <MotionBox
                                flex={1}
                                key={id}
                                variants={boxQAMotion}
                                initial="hidden"
                                animate={step === id ? "visible" : "hidden"}
                                transition={{ duration: 0.6 }}
                            >
                                <Box flex={1} key={id} hidden={step !== id}>
                                    <BlockChooseQuestion
                                        questionId={question.id}
                                    />
                                </Box>
                            </MotionBox>
                        ))}
                        <MotionBox
                            variants={boxQAMotion}
                            initial="hidden"
                            animate={
                                step === questions.length ? "visible" : "hidden"
                            }
                            transition={{ duration: 0.6 }}
                        >
                            <Box hidden={step !== questions.length}>
                                <PreviewDocument
                                    ModalStatus={ModalStatus}
                                    backStep={backStep}
                                    nextStep={nextStep}
                                />
                            </Box>
                        </MotionBox>
                    </Stack>
                )}
            </Box>
        </LayoutGenerate>
    );
};
