import {
    Box, Stack, useRadioGroup
} from "@chakra-ui/react";
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
    const selectedOptionsAtCurrentStep = watch(["selectedOptions"]);

    const isSelectedAtNextStepAfterBackAction =
        selectedOptionsAtCurrentStep[0] !== undefined &&
        selectedOptionsAtCurrentStep[0][questionId] !== undefined;

    const onChange = (e) => {
        setFormValue(`selectedOptions.${questionId}`, [Number(e)]);
    };
    const {
        value: value2,
        getRootProps,
        getRadioProps,
    } = useRadioGroup({
        defaultValue: isSelectedAtNextStepAfterBackAction
            ? String(selectedOptionsAtCurrentStep[0][questionId][0])
            : "",
        name: "options",
        onChange: onChange,
    });
    return (
        <Box>
            <Stack
                {...getRootProps()}
                spacing={10}
                wrap="wrap"
                direction={"row"}
            >
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
            </Stack>
        </Box>
    );
};
