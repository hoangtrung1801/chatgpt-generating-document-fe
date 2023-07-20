import { Box, Progress, Stack, Text } from "@chakra-ui/react";
import { BackTo } from "components/common/BackTo";
import { movePage } from "components/motion";
import { motion } from "framer-motion";
import useGetQuestions from "lib/hooks/useGetQuestions";
import { useRouter } from "next/router";
import React from "react";

type LayoutGenerateProps = {
    children: React.ReactElement;
    continueButton?: React.ReactElement;
    backAction: () => void;
    questionsLength?: number;
};

export const LayoutGenerate = ({
    children,
    backAction,
    continueButton,
    questionsLength,
}: LayoutGenerateProps) => {
    const router = useRouter();
    const step = Number(router.query.step);

    return (
        <Stack as={motion.div} {...movePage} align="center" spacing={10}>
            <Stack
                pos="relative"
                p={6}
                border="1px solid"
                borderRadius="16px"
                borderColor="#f8f8fb"
                bg="#f8f8fb"
                mx="auto"
                w="900px"
                h="500px"
                py={4}
            >
                <Box>
                    <Stack direction="row" justifyContent="space-between">
                        <BackTo color="black" action={backAction}>
                            <Text>Back</Text>
                        </BackTo>
                    </Stack>
                    {/* <Divider color="blackAlpha.800" /> */}
                </Box>
                {children}
                {step - 3 < questionsLength && (
                    <Box>
                        <Text fontSize="md" mb={4} textAlign="center">
                            Step {step - 2} of {questionsLength}
                        </Text>

                        <Progress
                            hasStripe
                            isAnimated
                            colorScheme="blackAlpha"
                            size="sm"
                            value={((step - 2) * 100) / questionsLength}
                        />
                    </Box>
                )}
            </Stack>
            {continueButton}
        </Stack>
    );
};
