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
import { app } from "components/create-project/data";
import { SendIcon } from "icons";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import ButtonLabel from "../ButtonLabel";
import { ReceiveContent } from "../ChatMessage";

type StepChooseAppsProps = {
    form: UseFormReturn<any>;
};

const StepChooseApps = ({ form }: StepChooseAppsProps) => {
    const { watch, setValue } = form;
    const [appState, setAppState] = useState("");
    const handleOnSend = () => {
        setValue("appId", "1");
        setValue("step", 3);
    };
    return (
        <Stack spacing="24px">
            <ReceiveContent>
                Sounds good! What would you like the document to be about?
            </ReceiveContent>
            <Stack spacing={4} p={4} bg="white">
                <InputGroup>
                    <Input
                        placeholder="Choose the app..."
                        _placeholder={{ color: "black" }}
                        color="black"
                        bg="white"
                        borderWidth="1px"
                        borderColor="#e5e0df"
                        // onKeyDown={(e) => e.keyCode === 13 && handleOnSend()}
                        value={appState}
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
                <Flex gap={4} justify="flex-end" w="full" flexWrap="wrap">
                    {app.map((item, idx) => (
                        <ButtonLabel
                            onClick={() => setAppState(item)}
                            key={idx}
                            isActive={appState === item}
                        >
                            {item}
                        </ButtonLabel>
                    ))}
                </Flex>
            </Stack>
        </Stack>
    );
};

export default StepChooseApps;
