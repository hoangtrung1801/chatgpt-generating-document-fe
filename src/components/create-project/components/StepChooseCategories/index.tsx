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
} from "@chakra-ui/react";
import { category } from "components/create-project/data";
import { SendIcon } from "icons";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import ButtonLabel from "../ButtonLabel";
import { ReceiveContent } from "../ChatMessage";

type StepChooseCategoriesProps = {
    form: UseFormReturn<any>;
};

const StepChooseCategories = ({ form }: StepChooseCategoriesProps) => {
    const { watch, setValue } = form;
    const [categoryState, setCategoryState] = useState("");
    const handleOnSend = () => {
        setValue("category", "1");
        setValue("step", 2);
    };
    return (
        <Stack spacing="24px">
            <ReceiveContent>
                Sounds good! What would you like the document to be about?
            </ReceiveContent>
            <Stack spacing={4} p={4} bg="white">
                <InputGroup>
                    <Input
                        placeholder="Choose the category..."
                        _placeholder={{ color: "black" }}
                        color="black"
                        bg="white"
                        borderWidth="1px"
                        borderColor="#e5e0df"
                        // onKeyDown={(e) => e.keyCode === 13 && handleOnSend()}
                        value={categoryState}
                        // onChange={(e) => setInputText(e.target.value)}
                    />
                    <InputRightElement>
                        <Icon
                            onClick={handleOnSend}
                            as={SendIcon}
                            w="20px"
                            h="20px"
                            color="blue"
                        />
                    </InputRightElement>
                </InputGroup>
                <Flex justify="flex-end" w="full" flexWrap="wrap" gap={4}>
                    {category.map((item, idx) => (
                        <ButtonLabel
                            onClick={() => setCategoryState(item)}
                            key={idx}
                            isActive={categoryState === item}
                        >
                            {item}
                        </ButtonLabel>
                    ))}
                </Flex>
            </Stack>
        </Stack>
    );
};

export default StepChooseCategories;
