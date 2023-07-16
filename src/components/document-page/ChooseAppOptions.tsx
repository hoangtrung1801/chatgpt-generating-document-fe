import {
    ArrowBackIcon,
    ArrowForwardIcon,
    TriangleDownIcon,
} from "@chakra-ui/icons";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    Input,
    Progress,
    Stack,
    Text,
    Textarea,
} from "@chakra-ui/react";
import useGetQuestions from "lib/hooks/useGetQuestions";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useConfirmStore from "stores/useCofirmOptions";
import useSelectionStore from "stores/useSelectionStore";
import BlockChooseQuestion from "./BlockChooseQuestion";
import ChooseAppCategory from "./ChooseAppCategory";

const questions = [
    {
        id: 1,
        name: "What type are you building?",
        description: "What type are you building?",
        type: "single",
        options: [
            {
                id: 4,
                name: "Android",
                description: "android",
            },
            {
                id: 5,
                name: "IOS",
                description: "IOS",
            },
            {
                id: 6,
                name: "Both",
                description: "both",
            },
        ],
    },
    {
        id: 2,
        name: "Do you need regsitration & authirzation?",
        description: "Do you need regsitration & authirzation?",
        type: "yesno",
        options: [
            {
                id: 8,
                name: "via Email",
                description: "via Email",
                type: "ENOUGH",
            },
            {
                id: 9,
                name: "via Phone",
                description: "via Phone",
                type: "ENOUGH",
            },
            {
                id: 10,
                name: "via Twitter",
                description: "via Twitter",
                type: "ADDITIONAL",
            },
        ],
        // options: [
        //     {
        //         id: 7,
        //         name: "Yes",
        //         description: "yes",
        //         subOptions: [
        //             {
        //                 id: 8,
        //                 name: "via Email",
        //                 description: "via Email",
        //                 type: "ENOUGH",
        //             },
        //             {
        //                 id: 9,
        //                 name: "via Phone",
        //                 description: "via Phone",
        //                 type: "ENOUGH",
        //             },
        //             {
        //                 id: 10,
        //                 name: "via Twitter",
        //                 description: "via Twitter",
        //                 type: "ADDITIONAL",
        //             },
        //         ],
        //     },
        // ],
    },
];

const ChooseAppOptions = ({
    nextStep,
    onSubmit,
    setOutStep,
    shortDescriptionApp,
}: any) => {
    const router = useRouter();
    const step = Number(router.query.step);

    const { watch } = useFormContext();
    const appId = watch("appId");

    const [noStep, setNoStep] = useState(0);

    const { questions, isLoading: questionsIsLoading } = useGetQuestions(appId);

    // useEffect(() => {
    //     console.log("category : ", category);
    //     clearOptions();

    // }, [category, clearOptions]);

    useEffect(() => {
        console.log({ questions });
    }, [questions]);

    return (
        <Box>
            {!questionsIsLoading && (
                <Box>
                    {questions.map((question, id) => (
                        <Box key={id} hidden={step - 3 !== id}>
                            <BlockChooseQuestion
                                questionId={question.id}
                                nextStep={nextStep}
                            />
                        </Box>
                    ))}
                    {noStep <= questions.length && (
                        <Box>
                            <Text fontSize="lg" mb={4} textAlign="center">
                                Step {noStep} of {questions.length}
                            </Text>
                            <Progress
                                // transition="ease-in-out 2s"
                                hasStripe
                                colorScheme="blue"
                                size="sm"
                                value={(noStep * 100) / questions.length}
                            />
                        </Box>
                    )}
                </Box>
            )}
            {/* {!questionsIsLoading && noStep > questions.length && (
                <Box display="flex" flexDirection="column" w="full" gap={10}>
                    <Text fontSize="3xl" fontWeight="bold" textAlign="center">
                        Confirm your selection
                    </Text>
                    <Box>
                        <Box>
                            <Text fontSize="xl" fontWeight="semibold">
                                1. What is your description?
                            </Text>
                            <Box display="flex" alignItems="center" gap={2}>
                                <ArrowForwardIcon
                                    color="blue.500"
                                    fontSize={22}
                                />
                                <Text fontSize="lg">
                                    Building an app called
                                    {shortDescriptionApp.name} and have
                                    descriptive details like{" "}
                                    {shortDescriptionApp.description}
                                </Text>
                            </Box>
                        </Box>

                        {confirmOptions.map((answer: any, index: number) => {
                            const question: any = questions.find(
                                (item: any) => item.id === answer.question_id
                            );
                            return (
                                <Box mb={2} key={answer.question_id}>
                                    <Text fontSize="xl" fontWeight="semibold">
                                        {index + 2}. {question?.name}
                                    </Text>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        gap={2}
                                    >
                                        <ArrowForwardIcon
                                            color="blue.500"
                                            fontSize={22}
                                        />
                                        <Text fontSize="lg">
                                            {answer.answers.length === 1
                                                ? answer.answers[0]
                                                : answer.answers.join(" && ")}
                                        </Text>
                                    </Box>
                                </Box>
                            );
                        })}
                    </Box>
                    <Text
                        fontWeight="bold"
                        textAlign="center"
                        fontSize="18px"
                        color="blue.400"
                    >
                        After this step, I will give you the result!
                    </Text>
                    <Button
                        mt="auto"
                        type="submit"
                        onSubmit={onSubmit}
                        colorScheme="blue"
                        size={"lg"}
                        onClick={onSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            )} */}
        </Box>
    );
};

export default ChooseAppOptions;
