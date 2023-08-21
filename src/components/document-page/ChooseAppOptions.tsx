import { useDisclosure, VStack } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ReceiveContent } from "components/create-project/components/ChatMessage";
import useGetQuestions from "lib/hooks/useGetQuestions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import Typist from "react-typist";
import { useCreateProject } from "stores";
import SingleQuestionAndReply from "./components/SingleQuestionAndReply";
import SingleTableContentAndReply from "./components/SingleTableContentAndReply";
import { checkEmptyOption } from "./data";
type TChooseAppOptions = {
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
            <ReceiveContent>
                <Wrapper avgTypingDelay={30} cursor={{ hideWhenDone: true }}>
                    Sounds good! What would you like the document to be about?
                </Wrapper>
            </ReceiveContent>
            {!questionsIsLoading &&
                questions.map(
                    (question, idx) =>
                        idx <= step && (
                            <SingleQuestionAndReply
                                continuationEnablement={continuationEnablement}
                                setContinuationEnablement={
                                    setContinuationEnablement
                                }
                                question={question}
                                backAction={backStep}
                                nextAction={nextStep}
                                key={idx}
                                step={step}
                                idx={idx}
                            />
                        )
                )}

            {step === questions.length && (
                <SingleTableContentAndReply
                    ModalStatus={ModalStatus}
                    continuationEnablement={continuationEnablement}
                    setContinuationEnablement={setContinuationEnablement}
                    backAction={backStep}
                    nextAction={nextStep}
                    step={step}
                />
            )}
        </VStack>
    );
};
