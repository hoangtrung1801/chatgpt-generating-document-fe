import {
    Box,
    Button,
    Icon,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    Textarea,
} from "@chakra-ui/react";
import { SendIcon } from "icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ReceiveContent } from "../ChatMessage";

type StepStepTypeShortDescProps = {
    form: UseFormReturn<any>;
};

const StepStepTypeShortDesc = ({ form }: StepStepTypeShortDescProps) => {
    const router = useRouter();
    const { watch, setValue } = form;
    const [categoryState, setCategoryState] = useState("");
    const handleClick = () => {
        setValue("category", "1");
        // router qua generate
        // set data into store, xong do qua ben kia fetch cau hoi
    };
    return (
        <Stack spacing="24px">
            <ReceiveContent>
                Sounds good! What would you like the document to be about?
            </ReceiveContent>
            <Stack color="black" p={4} bg="white">
                <Text>You can edit this outline, or continue as is:</Text>
                <InputGroup>
                    <Textarea
                        color="white"
                        bg="white"
                        borderWidth="1px"
                        borderColor="#e5e0df"
                        // onKeyDown={(e) => e.keyCode === 13 && handleOnSend()}
                        value={categoryState}
                        // onChange={(e) => setInputText(e.target.value)}
                    />
                </InputGroup>
                <Button onClick={handleClick}>Continue</Button>
            </Stack>
        </Stack>
    );
};

export default StepStepTypeShortDesc;
