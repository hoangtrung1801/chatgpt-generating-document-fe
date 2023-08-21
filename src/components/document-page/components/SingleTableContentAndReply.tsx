import { Box, BoxProps, Button, Icon, Stack, Text } from "@chakra-ui/react";
import { ReceiveContent } from "components/create-project/components/ChatMessage";
import { boxQAPopoverMotion } from "components/motion";
import { motion } from "framer-motion";
import { AgainIcon, ArrowIcon } from "icons";
import useGetQuestions from "lib/hooks/useGetQuestions";
import { useCreateProject } from "stores";
import { PreviewDocument } from "../PreviewDocument";
import { CardQA } from "./BlockChooseQuestion";
import Typist from "react-typist";
import styled from "@emotion/styled";

interface SingleTableContentAndReplyProps extends BoxProps {
    step: number;
    backAction: () => void;
    nextAction: () => void;
    continuationEnablement: boolean;
    setContinuationEnablement: any;
    ModalStatus: any;
}
const Wrapper = styled(Typist)`
    .Cursor {
        display: inline-block;
    }
    .Cursor--blinking {
        display: none;
    }
`;

const SingleTableContentAndReply = ({
    step,
    nextAction,
    backAction,
    continuationEnablement,
    setContinuationEnablement,
    ModalStatus,
}: SingleTableContentAndReplyProps) => {
    const { appId } = useCreateProject((state) => state.data);
    const { questions, isLoading: questionsIsLoading } = useGetQuestions(appId);

    return (
        <Stack spacing={6} w="full">
            <ReceiveContent>
                <Wrapper avgTypingDelay={30} cursor={{ hideWhenDone: true }}>
                    Your document is almost finished!
                </Wrapper>
            </ReceiveContent>
            <motion.div
                variants={boxQAPopoverMotion}
                initial="hidden"
                animate={step === questions.length ? "visible" : "hidden"}
                transition={{ duration: 0.6 }}
            >
                <CardQA
                    TableContentMode={true}
                    w="full"
                    backButton={
                        <Button
                            zIndex={2}
                            isDisabled={!continuationEnablement}
                            onClick={backAction}
                            variant="outline"
                            rightIcon={<Icon as={AgainIcon} />}
                        >
                            <Text>Back</Text>
                        </Button>
                    }
                    continueButton={
                        <Button
                            zIndex={2}
                            isDisabled={!continuationEnablement}
                            onClick={nextAction}
                            variant="primary"
                            rightIcon={<Icon as={ArrowIcon} />}
                        >
                            <Text>Continue</Text>
                        </Button>
                    }
                >
                    <PreviewDocument
                        createSectionButton={
                            <Button
                                onClick={() => ModalStatus.onOpen()}
                                maxW="200px"
                                variant="primary"
                            >
                                Create Section
                            </Button>
                        }
                        ModalStatus={ModalStatus}
                        backStep={backAction}
                        nextStep={nextAction}
                    />
                </CardQA>
            </motion.div>
        </Stack>
    );
};

export default SingleTableContentAndReply;
