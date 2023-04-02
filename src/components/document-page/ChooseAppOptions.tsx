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
import { useEffect, useState } from "react";
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
    onSubmit,
    setOutStep,
    shortDescriptionApp,
}: any) => {
    const [noStep, setNoStep] = useState(0);

    const category = useSelectionStore((state) => state.category);
    const options = useSelectionStore((state) => state.options);
    // const updateNumberBack = useSelectionStore((state) => state.numberBack);
    // const removeBackOptions = useSelectionStore(
    //     (state) => state.removeBackOptions
    // );

    const { clearOptions, confirmOptions } = useConfirmStore();

    const { questions, isLoading: questionsIsLoading } = useGetQuestions(
        category as number
    );

    const nextStep = () => {
        setNoStep(noStep + 1);
    };

    const prevStep = () => {
        // removeBackOptions(updateNumberBack);
        if (noStep - 1 >= 0) {
            setNoStep(noStep - 1);
        }
    };
    // useEffect(() => {
    //     console.log("category : ", category);
    //     clearOptions();

    // }, [category, clearOptions]);

    return (
        <Box>
            <HStack justify={"space-between"} alignItems="center">
                {noStep !== 0 && (
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        cursor={"pointer"}
                        onClick={prevStep}
                    >
                        <Button
                            colorScheme="blue"
                            leftIcon={<ArrowBackIcon />}
                            size={"lg"}
                            mb="20px"
                        >
                            Back
                        </Button>
                    </Stack>
                )}

                {/* {noStep <= questions.length && (
                    <Box>
                        {noStep > 0 && (
                            <Stack
                                padding="4px 16px"
                                bg="blackAlpha.300"
                                borderRadius={12}
                            >
                                <Text>
                                    Step {noStep} of {questions.length}
                                </Text>
                            </Stack>
                        )}
                    </Box>
                )} */}
            </HStack>

            {noStep === 0 && (
                <ChooseAppCategory
                    nextStep={nextStep}
                    setOutStep={setOutStep}
                />
            )}
            {!questionsIsLoading && noStep !== 0 && (
                <Box>
                    {questions.map((question: any, id: number) => (
                        <Box
                            key={question.name}
                            hidden={id + 1 === noStep ? false : true}
                        >
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
                                hasStripe
                                colorScheme="blue"
                                size="sm"
                                value={(noStep * 100) / questions.length}
                            />
                        </Box>
                    )}
                </Box>
            )}
            {!questionsIsLoading && noStep > questions.length && (
                <Box display="flex" flexDirection="column" w="full" gap={10}>
                    <Text fontSize="3xl" fontWeight="bold" textAlign="center">
                        Confirm your selection
                    </Text>
                    {/* <FormControl>
                        <FormLabel>Application name</FormLabel>
                        <Input
                            disabled
                            defaultValue={shortDescriptionApp.name}
                            bg="white"
                        />
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            defaultValue={shortDescriptionApp.description}
                            disabled
                            minHeight="200px"
                            bg="white"
                        />
                    </FormControl> */}
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
                    <Text fontWeight="bold" textAlign="center" color="blue.400">
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
            )}
        </Box>
    );
};

export default ChooseAppOptions;
