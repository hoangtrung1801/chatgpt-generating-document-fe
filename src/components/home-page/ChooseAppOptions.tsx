import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import useGetQuestions from "lib/hooks/useGetQuestions";
import { useEffect, useState } from "react";
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

const ChooseAppOptions = ({ onSubmit }: any) => {
    const [noStep, setNoStep] = useState(0);

    const category = useSelectionStore((state) => state.category);
    const options = useSelectionStore((state) => state.options);

    const { questions, isLoading: questionsIsLoading } = useGetQuestions();

    const nextStep = () => {
        setNoStep(noStep + 1);
    };

    const prevStep = () => {
        if (noStep - 1 >= 0) {
            setNoStep(noStep - 1);
        }
    };

    useEffect(() => {
        console.log("options", options);
    }, [options]);

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
                        <ArrowBackIcon />
                        <Text>Back</Text>
                    </Stack>
                )}

                {noStep <= questions.length && (
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
            </HStack>

            {noStep === 0 && <ChooseAppCategory nextStep={nextStep} />}
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
                </Box>
            )}
            {!questionsIsLoading && noStep > questions.length && (
                <Box w="full" textAlign={"center"} mt={24}>
                    <Button
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
