import {
    Box,
    Button,
    HStack,
    Stack,
    Text,
    useDisclosure,
    VStack,
    Icon,
} from "@chakra-ui/react";
import { ReceiveContent } from "components/create-project/components/ChatMessage";
import { boxQAMotion, boxQAPopoverMotion } from "components/motion";
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
import styled from "@emotion/styled";
import Typist from "react-typist";
import { BlockChooseQuestionv2 } from "./BlockChooseQuestionV2";
import { AgainIcon, ArrowIcon } from "icons";
type TChooseAppOptionsV2 = {
    nextStep: () => void;
    backStep: () => void;
};

const Wrapper = styled(Typist)`
    .Cursor {
        display: inline-block;
    }
    .Cursor--blinking {
        display: none;
    }
`;

export const ChooseAppOptionsV2 = ({
    nextStep,
    backStep,
}: TChooseAppOptionsV2) => {
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
            <ReceiveContent>
                <Wrapper avgTypingDelay={30} cursor={{ hideWhenDone: true }}>
                    Sounds good! What would you like the document to be about?
                </Wrapper>
            </ReceiveContent>
            {!questionsIsLoading &&
                questions.map((question, idx) => (
                    <Stack w="full" key={idx}>
                        {idx <= step && idx !== 0 && (
                            <ReceiveContent>
                                <Wrapper
                                    avgTypingDelay={30}
                                    cursor={{ hideWhenDone: true }}
                                >
                                    Ok let go to next question
                                </Wrapper>
                            </ReceiveContent>
                        )}

                        <motion.div
                            hidden={idx > step}
                            variants={boxQAPopoverMotion}
                            initial="hidden"
                            animate={idx <= step ? "visible" : "hidden"}
                            transition={{ duration: 0.6 }}
                        >
                            <CardQA
                                backButton={
                                    <Button
                                        hidden={idx !== step}
                                        zIndex={2}
                                        isDisabled={!continuationEnablement}
                                        onClick={backStep}
                                        fontSize="md"
                                        h="full"
                                        color="#2208cc"
                                        borderColor="#2208cc"
                                        borderWidth="2px"
                                        borderRadius="md"
                                        bg="transparent"
                                        variant="outline"
                                        boxShadow="md"
                                        rightIcon={<Icon as={AgainIcon} />}
                                        _hover={{
                                            backgroundColor: "#eae7ff",
                                        }}
                                    >
                                        <Text>Back</Text>
                                    </Button>
                                }
                                continueButton={
                                    <Button
                                        hidden={idx !== step}
                                        zIndex={2}
                                        isDisabled={!continuationEnablement}
                                        onClick={nextStep}
                                        fontSize="md"
                                        h="full"
                                        bg="#3c03d7"
                                        fontWeight="600"
                                        variant="outline"
                                        color="gray.100"
                                        borderRadius="md"
                                        boxShadow="md"
                                        rightIcon={<Icon as={ArrowIcon} />}
                                    >
                                        <Text>Continue</Text>
                                    </Button>
                                }
                                questionsLength={questions.length}
                                backAction={backStep}
                            >
                                <Box
                                    color="black"
                                    flex={1}
                                    justifyContent="flex-end"
                                >
                                    <BlockChooseQuestionv2
                                        questionId={question.id}
                                    />
                                </Box>
                            </CardQA>
                        </motion.div>
                    </Stack>
                ))}

            {step === questions.length && (
                <motion.div
                    variants={boxQAPopoverMotion}
                    initial="hidden"
                    animate={step === questions.length ? "visible" : "hidden"}
                    transition={{ duration: 0.6 }}
                >
                    <CardQA
                        backButton={
                            <Button
                                hidden={step !== questions.length}
                                zIndex={2}
                                isDisabled={!continuationEnablement}
                                onClick={backStep}
                                fontSize="md"
                                h="full"
                                color="#2208cc"
                                borderColor="#2208cc"
                                borderWidth="2px"
                                borderRadius="md"
                                bg="transparent"
                                variant="outline"
                                boxShadow="md"
                                rightIcon={<Icon as={AgainIcon} />}
                                _hover={{
                                    backgroundColor: "#eae7ff",
                                }}
                            >
                                <Text>Back</Text>
                            </Button>
                        }
                        continueButton={
                            <Button
                                hidden={step !== questions.length}
                                zIndex={2}
                                isDisabled={!continuationEnablement}
                                onClick={nextStep}
                                fontSize="md"
                                h="full"
                                bg="#3c03d7"
                                fontWeight="600"
                                variant="outline"
                                color="gray.100"
                                borderRadius="md"
                                boxShadow="md"
                                rightIcon={<Icon as={ArrowIcon} />}
                            >
                                <Text>Continue</Text>
                            </Button>
                        }
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
            {/* <HStack
                pos="fixed"
                bottom={0}
                // right="50%"
                w="full"
                justify="flex-end"
            >
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
                <Button
                    zIndex={2}
                    isDisabled={!continuationEnablement}
                    onClick={nextStep}
                    maxW="200px"
                    variant="secondary"
                    bg="blue"
                >
                    <Text>Back</Text>
                </Button>
            </HStack> */}
        </VStack>
    );
};
