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

    return (
        <Box>
            {!questionsIsLoading && (
                <Stack minH={500}>
                    {questions.map((question, id) => (
                        <Box key={id} hidden={step - 3 !== id}>
                            <BlockChooseQuestion
                                questionId={question.id}
                                nextStep={nextStep}
                            />
                        </Box>
                    ))}
                    {step <= questions.length && (
                        <Box style={{ marginTop: "auto !important" }}>
                            <Text fontSize="lg" mb={4} textAlign="center">
                                Step {step - 2} of {questions.length}
                            </Text>
                            <Progress
                                // transition="ease-in-out 2s"
                                hasStripe
                                colorScheme="blackAlpha"
                                size="md"
                                value={((step - 2) * 100) / questions.length}
                            />
                        </Box>
                    )}
                </Stack>
            )}
        </Box>
    );
};

export default ChooseAppOptions;
