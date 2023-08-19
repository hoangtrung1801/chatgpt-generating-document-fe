import { Box, Button, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { boxQAMotion } from "components/motion";
import { motion } from "framer-motion";
import useGetQuestions from "lib/hooks/useGetQuestions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useCreateProject } from "stores";
import { BlockChooseQuestion } from "./BlockChooseQuestion";
import { CardQA } from "./components";
import { checkEmptyOption } from "./data";
import { PreviewDocument } from "./PreviewDocument";
type TChooseAppOptions = {
    nextStep: () => void;
    backStep: () => void;
};

export const ChooseAppOptions = ({ nextStep, backStep }: TChooseAppOptions) => {
    const ModalStatus = useDisclosure();
    const { watch } = useFormContext();
    const [selectedOptions] = watch(["selectedOptions"]);
    const { appId } = useCreateProject((state) => state.data);
    const router = useRouter();
    const { questions, isLoading: questionsIsLoading } = useGetQuestions(appId);
    const step = Number(router.query.step) || 0;

    const [continuationEnablement, setContinuationEnablement] = useState(false);

    // check empty options
    useEffect(() => {
        if (step < questions.length) {
            checkEmptyOption(selectedOptions, questions[step].id)
                ? setContinuationEnablement(false)
                : setContinuationEnablement(true);
        }
    }, [questions, selectedOptions, step]);

    return (
        <VStack spacing={6}>
            {!questionsIsLoading &&
                questions.map((question, idx) => (
                    <motion.div
                        key={idx}
                        hidden={step !== idx}
                        variants={boxQAMotion}
                        initial="hidden"
                        animate={step === idx ? "visible" : "hidden"}
                        transition={{ duration: 0.6 }}
                    >
                        <CardQA
                            questionsLength={questions.length}
                            backAction={backStep}
                        >
                            <Box color="black" flex={1}>
                                <BlockChooseQuestion questionId={question.id} />
                            </Box>
                        </CardQA>
                    </motion.div>
                ))}
            {step === questions.length && (
                <motion.div
                    variants={boxQAMotion}
                    initial="hidden"
                    animate={step === questions.length ? "visible" : "hidden"}
                    transition={{ duration: 0.6 }}
                >
                    <CardQA
                        createSectionButton={
                            step === questions.length && (
                                <Button
                                    onClick={() => ModalStatus.onOpen()}
                                    maxW="200px"
                                    variant="secondary"
                                >
                                    Create Section
                                </Button>
                            )
                        }
                        questionsLength={questions.length}
                        backAction={backStep}
                    >
                        <PreviewDocument
                            ModalStatus={ModalStatus}
                            backStep={backStep}
                            nextStep={nextStep}
                        />
                    </CardQA>
                </motion.div>
            )}

            <Button
                zIndex={2}
                isDisabled={!continuationEnablement}
                onClick={nextStep}
                maxW="200px"
                variant="secondary"
                bg="blue"
            >
                <Text>Continue</Text>
            </Button>
        </VStack>
    );
};
