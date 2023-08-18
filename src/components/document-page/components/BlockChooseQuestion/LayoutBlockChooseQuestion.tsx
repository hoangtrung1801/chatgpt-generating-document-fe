import {
    Box,
    Button,
    Divider,
    HStack,
    Progress,
    Stack,
    Text,
} from "@chakra-ui/react";
import { BackTo } from "components/common/BackTo";
import { movePage } from "components/motion";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useRef } from "react";

type LayoutGenerateProps = {
    children: React.ReactElement;
    continueButton?: React.ReactElement;
    createSectionButton?: React.ReactElement;
    backAction: () => void;
    questionsLength?: number;
};

export const LayoutGenerate = ({
    children,
    backAction,
    createSectionButton,
    continueButton,
    questionsLength,
}: LayoutGenerateProps) => {
    const router = useRouter();
    const step = Number(router.query.step);
    const progressDivRef = useRef();
    const progressBarDiv: any = progressDivRef.current;
    // add css progress bar animation
    if (progressBarDiv) {
        progressBarDiv.querySelector("div").style.transition =
            "ease-in-out .5s";
    }

    return (
        <Stack
            color="black"
            as={motion.div}
            {...movePage}
            align="center"
            spacing={10}
        >
            <Stack
                pos="relative"
                p={6}
                border="1px solid"
                borderRadius="16px"
                borderColor="#f8f8fb"
                bg="white"
                mx="auto"
                w="900px"
                h="500px"
                py={4}
            >
                <Box>
                    <Stack pb={3} direction="row" align="center">
                        <HStack w="full" justify="space-between">
                            <BackTo color="black" action={backAction}>
                                <Text fontSize="md" fontWeight="semibold">
                                    Back
                                </Text>
                            </BackTo>
                            {createSectionButton}
                        </HStack>
                    </Stack>
                    <Divider color="blackAlpha.800" />
                </Box>
                <Box flex={1} overflow="auto">
                    {children}
                </Box>
                {step < questionsLength && (
                    <Box>
                        <Text fontSize="md" mb={4} textAlign="center">
                            Step {step + 1} of {questionsLength}
                        </Text>

                        <Progress
                            ref={progressDivRef}
                            hasStripe
                            isAnimated
                            // bg="blue"
                            colorScheme="blue"
                            size="xs"
                            value={(step * 100) / questionsLength}
                        />
                    </Box>
                )}
            </Stack>
            {continueButton}
        </Stack>
    );
};
