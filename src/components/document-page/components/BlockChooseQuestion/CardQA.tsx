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
import React, { useEffect, useRef, useState } from "react";

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
    TableContentMode?: boolean;
    backAction?: () => void;
    questionsLength?: number;
}

export const CardQA = ({
    children,
    backAction,
    TableContentMode,
    continueButton,
    backButton,
    questionsLength,
    ...rest
}: CardQAProps) => {
    const router = useRouter();
    const step = Number(router.query.step) | 0;

    return (
        <Stack align={TableContentMode ? "" : "flex-end"} spacing={10}>
            <Stack
                p={6}
                border="1px solid"
                borderRadius="16px"
                borderColor="#f8f8fb"
                bg="#f7f3f2"
                py={4}
                spacing={6}
                {...rest}
            >
                <Box overflow="auto">{children}</Box>

                <HStack justify="flex-end">
                    {backButton} {continueButton}
                </HStack>
            </Stack>
        </Stack>
    );
};
