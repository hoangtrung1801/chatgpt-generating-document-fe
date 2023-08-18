import {
    Box,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Icon,
    Flex,
    Text,
    Button,
    IconButton,
    BoxProps,
    StackProps,
} from "@chakra-ui/react";
import { category } from "components/create-project/data";
import { SendIcon } from "icons";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import ButtonLabel from "../ButtonLabel";
import { NoteMessage, ReceiveContent } from "../ChatMessage";
import styled from "@emotion/styled";
import Typist from "react-typist";
import { motion } from "framer-motion";
import { LeftToRight } from "components/motion";
import useCategories from "lib/hooks/useGetCategories";
import { CategoriesResponse } from "lib/hooks/useGetCategories";

const Wrapper = styled(Typist)`
    .Cursor {
        display: inline-block;
    }
    .Cursor--blinking {
        display: none;
    }
`;

interface StepChooseCategoriesProps extends StackProps {
    form: UseFormReturn<any>;
}

const StepChooseCategories = ({ form, ...rest }: StepChooseCategoriesProps) => {
    const { categories, isLoading } = useCategories();
    const { watch, setValue } = form;
    const ref = useRef(null);
    const [categoryState, setCategoryState] = useState<number | null>();
    const { name } = useMemo(() => {
        if (categoryState) {
            return categories.find((category) => category.id === categoryState);
        }
        return {};
    }, [categoryState, categories]);
    const handleOnChange = (category_id: number) => {
        setCategoryState(category_id);
    };
    const handleOnSend = () => {
        if (categoryState) {
            setValue("category", categoryState);
            setValue("step", 2);
        }
        return;
    };
    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [ref]);
    return (
        <Stack {...rest} spacing="24px">
            <ReceiveContent>
                <Wrapper avgTypingDelay={30} cursor={{ hideWhenDone: true }}>
                    Sounds good! What would you like the document to be about?
                </Wrapper>
            </ReceiveContent>
            <Stack
                as={motion.div}
                {...LeftToRight({ delay: 1 })}
                spacing={4}
                p={4}
                bg="white"
            >
                <InputGroup>
                    <Input
                        placeholder="Choose the category..."
                        _placeholder={{ color: "black" }}
                        color="black"
                        bg="white"
                        borderWidth="1px"
                        borderColor="#e5e0df"
                        // onKeyDown={(e) => e.keyCode === 13 && handleOnSend()}
                        value={name || ""}
                        // onChange={(e) => setInputText(e.target.value)}
                    />
                    <InputRightElement>
                        <Icon
                            onClick={handleOnSend}
                            as={SendIcon}
                            w="20px"
                            h="20px"
                            color="blue"
                            opacity={!categoryState && 0.4}
                        />
                    </InputRightElement>
                </InputGroup>
                <Flex justify="flex-end" w="full" flexWrap="wrap" gap={4}>
                    {!isLoading &&
                        categories.map(
                            (item: CategoriesResponse, idx: number) => (
                                <ButtonLabel
                                    isDisabled={item.status === "COMING_SOON"}
                                    onClick={() => handleOnChange(item.id)}
                                    key={idx}
                                    isActive={categoryState === item.id}
                                >
                                    {item.name}
                                </ButtonLabel>
                            )
                        )}
                </Flex>
            </Stack>
        </Stack>
    );
};

export default StepChooseCategories;
