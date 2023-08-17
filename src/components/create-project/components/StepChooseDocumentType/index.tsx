import { Box, Button, HStack, Stack } from "@chakra-ui/react";
import {
    documentModeData,
    documentModes,
} from "components/create-project/data";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ReceiveContent } from "../ChatMessage";
import CardMode from "./CardMode";

type StepChooseDocumentTypeProps = {
    form: UseFormReturn<any>;
};

const StepChooseDocumentType = ({ form }: StepChooseDocumentTypeProps) => {
    return (
        <Stack>
            <ReceiveContent>
                Hi Tuan, I am your AI design partner.
            </ReceiveContent>
            {/* block */}
            <HStack p="12px" bg="white" spacing={2}>
                {documentModeData.map((item, idx: number) => (
                    <CardMode
                        key={item.title}
                        form={form}
                        title={item.title}
                        mode={item.mode}
                        imageUrl={item.imageUrl}
                    />
                ))}
            </HStack>
        </Stack>
    );
};

export default StepChooseDocumentType;
