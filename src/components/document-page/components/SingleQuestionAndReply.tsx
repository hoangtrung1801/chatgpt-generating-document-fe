import { Box, BoxProps, Button, Icon, Stack, Text } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReceiveContent } from "components/create-project/components/ChatMessage";
import { boxQAPopoverMotion } from "components/motion";
import { motion } from "framer-motion";
import { AgainIcon, ArrowIcon } from "icons";
import { useEffect, useRef } from "react";
import Typist from "react-typist";
import { BlockChooseQuestion } from "../BlockChooseQuestion";
import { CardQA } from "./BlockChooseQuestion";

interface SingleQuestionAndReplyProps extends BoxProps {
    idx: number;
    step: number;
    backAction: () => void;
    nextAction: () => void;
    continuationEnablement: boolean;
    setContinuationEnablement: any;
    question: any;
}
const Wrapper = styled(Typist)`
    .Cursor {
        display: inline-block;
    }
    .Cursor--blinking {
        display: none;
    }
`;

const SingleQuestionAndReply = ({
    idx,
    step,
    question,
    nextAction,
    backAction,
    continuationEnablement,
    setContinuationEnablement,
    ...rest
}: SingleQuestionAndReplyProps) => {
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "instant" });
        }
        return;
    }, [step]);

    return (
        <Stack ref={ref} {...rest} w="full">
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
                            onClick={() => {
                                backAction();
                            }}
                            variant="outline"
                            rightIcon={<Icon as={AgainIcon} />}
                        >
                            <Text>Back</Text>
                        </Button>
                    }
                    continueButton={
                        <Button
                            hidden={idx !== step}
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
                    <Box color="black" flex={1} justifyContent="flex-end">
                        <BlockChooseQuestion questionId={question.id} />
                    </Box>
                </CardQA>
            </motion.div>
        </Stack>
    );
};

export default SingleQuestionAndReply;
