import type { HTMLChakraProps } from "@chakra-ui/react";
import {
    Box,
    BoxProps,
    Divider,
    HStack,
    Progress,
    Stack,
    Text,
} from "@chakra-ui/react";
import { BackTo } from "components/common/BackTo";
import type { HTMLMotionProps } from "framer-motion";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

import type { Merge } from "lib/types/merge";
type MotionBoxProps = Merge<HTMLChakraProps<"div">, HTMLMotionProps<"div">>;

type CardProps = {
    children: React.ReactElement;
    continueButton?: React.ReactElement;
    createSectionButton?: React.ReactElement;
    backAction: () => void;
    questionsLength?: number;
};
// type CardQAMotionProps = CardProps & BoxProps & MotionBoxProps;
interface CardQAProps extends BoxProps {
    children: React.ReactElement;
    continueButton?: React.ReactElement;
    backButton?: React.ReactElement;
    createSectionButton?: React.ReactElement;
    backAction: () => void;
    questionsLength?: number;
}

export const CardQA = ({
    children,
    backAction,
    createSectionButton,
    continueButton,
    backButton,
    questionsLength,
    ...rest
}: CardQAProps) => {
    const router = useRouter();
    const step = Number(router.query.step) | 0;
    const ref = useRef(null);
    ref.current?.scrollIntoView({ behavior: "smooth" });
    // useEffect(() => {
    // }, [ref]);
    // const progressDivRef = useRef();
    // const progressBarDiv: any = progressDivRef.current;
    // // add css progress bar animation
    // if (progressBarDiv) {
    //     progressBarDiv.querySelector("div").style.transition =
    //         "ease-in-out .5s";
    // }

    return (
        <Stack
            ref={ref}
            align={createSectionButton ? "" : "flex-end"}
            spacing={10}
        >
            <Stack
                p={6}
                border="1px solid"
                borderRadius="16px"
                borderColor="#f8f8fb"
                bg="#f7f3f2"
                py={4}
                {...rest}
            >
                {/* <Box>
                    <Stack spacing={4} align="center">
                        <HStack w="full" justify="space-between">
                            <BackTo color="black" action={backAction}>
                                <Text fontSize="md" fontWeight="semibold">
                                    Back
                                </Text>
                            </BackTo>
                            {createSectionButton}
                        </HStack>
                        <Divider borderColor="#726e6e" />
                    </Stack>
                </Box> */}
                <Box overflow="auto">{children}</Box>
                {/* {step < questionsLength && (
                    <Box>
                        <Text
                            fontSize="md"
                            fontWeight={500}
                            mb={4}
                            textAlign="center"
                        >
                            Step {step + 1} of {questionsLength}
                        </Text>

                        <Progress
                            ref={progressDivRef}
                            hasStripe
                            isAnimated
                            // bg="blue"
                            colorScheme="blue"
                            size="xs"
                            value={((step + 1) * 100) / questionsLength}
                        />
                    </Box>
                )} */}
                <HStack justify="flex-end">
                    {backButton} {continueButton}
                </HStack>
            </Stack>
        </Stack>
    );
};
