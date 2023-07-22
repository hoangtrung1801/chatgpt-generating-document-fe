import { Box, Radio, RadioGroup, Stack, useRadioGroup } from "@chakra-ui/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CustomRadio } from "./CustomRadio";
type TSingleOption = {
    questionId: number;
    options: Array<any>;
    yesno?: boolean;
};

export const SingleOption = ({
    questionId,
    options = [],
    yesno = false,
}: TSingleOption) => {
    const { setValue: setFormValue, watch } = useFormContext();
    const [value, setValue] = useState("");

    const onChange = (e) => {
        setValue(e);
        if (yesno) {
            if (e === "YES") {
                setFormValue(`selectedOptions.${questionId}`, [
                    Number(questionId),
                ]);
            } else {
                setFormValue(`selectedOptions.${questionId}`, []);
            }
        } else {
            setFormValue(`selectedOptions.${questionId}`, [Number(e)]);
        }
    };
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "options",
        onChange: onChange,
    });
    return (
        <Box>
            <RadioGroup value={value} onChange={onChange}>
                <Stack spacing={10} wrap="wrap" direction={"row"}>
                    {options.map((option) => (
                        <CustomRadio
                            key={option.id}
                            {...getRadioProps({
                                value: String(option.id),
                            })}
                        >
                            {option.name}
                        </CustomRadio>
                    ))}
                    {yesno && (
                        <>
                            <Radio value={"YES"}>Yes</Radio>
                            <Radio value={"NO"}>No</Radio>
                        </>
                    )}
                </Stack>
            </RadioGroup>
        </Box>
    );
};
