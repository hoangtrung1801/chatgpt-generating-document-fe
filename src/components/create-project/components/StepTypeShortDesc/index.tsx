import {
    Box,
    BoxProps,
    Button,
    HStack,
    Icon,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    Textarea,
} from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import { AgainIcon, ArrowIcon, SendIcon } from "icons";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ReceiveContent } from "../ChatMessage";
import styled from "@emotion/styled";
import Typist from "react-typist";
import { motion } from "framer-motion";
import { LeftToRight } from "components/motion";
import { useCreateProject } from "stores";

const Wrapper = styled(Typist)`
    .Cursor {
        display: inline-block;
    }
    .Cursor--blinking {
        display: none;
    }
`;

interface StepStepTypeShortDescProps extends BoxProps {
    form: UseFormReturn<any>;
}

const StepStepTypeShortDesc = ({
    form,
    ...rest
}: StepStepTypeShortDescProps) => {
    const router = useRouter();
    const { watch, setValue } = form;
    const [category, appId, description, projectName] = watch([
        "category",
        "appId",
        "description",
        "projectName",
    ]);
    const ref = useRef(null);
    const updateCreateProjectContent = useCreateProject(
        (state) => state.updateCreateProjectContent
    );
    const [descriptionState, setDescriptionState] = useState("");
    const handleClick = () => {
        setValue("description", descriptionState);
        router.push("/generate");
        updateCreateProjectContent({
            appId,
            description: descriptionState,
            projectName,
        });

        // router qua generate
        // set data into store, xong do qua ben kia fetch cau hoi
    };
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [ref]);
    return (
        <Stack ref={ref} {...rest} spacing="24px">
            <ReceiveContent>
                <Wrapper avgTypingDelay={30} cursor={{ hideWhenDone: true }}>
                    {`${projectName}? Sounds interesting! Please give me a detailed description of your project?`}
                </Wrapper>
            </ReceiveContent>
            <Stack
                as={motion.div}
                {...LeftToRight({ delay: 1 })}
                color="black"
                p={4}
                bg="white"
            >
                <Text>
                    Typing the most detailed information to achieve the best
                    results!
                </Text>
                <InputGroup>
                    <Textarea
                        as={TextareaAutosize}
                        minH="150px"
                        color="black"
                        bg="white"
                        borderWidth="1px"
                        borderColor="#e5e0df"
                        onKeyDown={(e) => e.keyCode === 13 && handleClick()}
                        value={descriptionState}
                        onChange={(e) => setDescriptionState(e.target.value)}
                    />
                </InputGroup>
                <HStack maxH="44px">
                    <Button
                        fontSize="md"
                        h="full"
                        minW="190px"
                        color="#2208cc"
                        borderColor="#2208cc"
                        borderWidth="2px"
                        borderRadius="md"
                        bg="transparent"
                        variant="outline"
                        boxShadow="md"
                        onClick={handleClick}
                        rightIcon={<Icon as={AgainIcon} />}
                        _hover={{
                            backgroundColor: "#eae7ff",
                        }}
                    >
                        Try again!
                    </Button>
                    <Button
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        fontSize="md"
                        h="full"
                        flex={1}
                        bg="#3c03d7"
                        fontWeight="600"
                        variant="primary"
                        color="gray.100"
                        borderRadius="md"
                        boxShadow="md"
                        rightIcon={<Icon as={ArrowIcon} />}
                        onClick={handleClick}
                        isDisabled={!descriptionState}
                    >
                        Continue
                    </Button>
                </HStack>
            </Stack>
        </Stack>
    );
};

export default StepStepTypeShortDesc;
