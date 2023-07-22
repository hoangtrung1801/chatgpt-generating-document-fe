import { Box, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
type TMultiOptions = {
    questionId: number;
    options: Array<any>;
};
export const MultiOptions = ({ questionId, options }: TMultiOptions) => {
    const { setValue: setFormValue, watch } = useFormContext();

    const [value, setValue] = useState([]);

    const onChange = (e) => {
        setValue(e);
        setFormValue(`selectedOptions.${questionId}`, e.map(Number));
    };

    return (
        <Box>
            <CheckboxGroup value={value} onChange={onChange}>
                <Stack direction={"column"}>
                    {options.map((option, idx) => (
                        <Box key={option.id} w="full" cursor="pointer">
                            <Checkbox
                                p="14px 20px"
                                borderRadius="6px"
                                bg="#f8f8fb"
                                border="2px solid #949ca8"
                                sx={{
                                    _checked: {
                                        backgroundColor: "rgba(0,102,255,.1)",
                                        borderColor: "#06f",
                                    },
                                }}
                                w="full"
                                value={String(option.id)}
                            >
                                {option.name}
                            </Checkbox>
                        </Box>
                    ))}
                </Stack>
            </CheckboxGroup>
        </Box>
    );
};
