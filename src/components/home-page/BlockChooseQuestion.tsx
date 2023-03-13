import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    Heading,
    Radio,
    RadioGroup,
    SimpleGrid,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import WrapperRadio from "components/WrapperRadio";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useSelectionStore from "stores/useSelectionStore";

const BlockChooseQuestion = ({ question, nextStep }: any) => {
    const addOptions = useSelectionStore((state) => state.addOptions);
    const numberBack = useSelectionStore((state) => state.updateNumberBack);

    const [optionValues, setOptionValues] = useState([]);

    useEffect(() => {
        console.log(optionValues);
        console.log(optionValues.length);
    }, [optionValues]);

    const onSave = () => {
        numberBack(optionValues.length);
        addOptions([...optionValues]);
        nextStep();
    };

    return (
        <VStack spacing={6}>
            <Heading>{question.name}</Heading>
            <Box>
                {question.type === "single" && (
                    <SingleOption
                        options={question.options}
                        setOptionValues={setOptionValues}
                        optionValues={optionValues}
                    />
                )}

                {question.type === "yesno" && (
                    <YesNoOption
                        options={question.options}
                        optionValues={optionValues}
                        setOptionValues={setOptionValues}
                    />
                )}
            </Box>
            <Box textAlign={"right"} mt={8} w="full">
                <Button colorScheme={"blue"} onClick={onSave}>
                    Save & continue
                </Button>
            </Box>
        </VStack>
    );
};

const SingleOption = ({ options, setOptionValues, optionValues }: any) => {
    console.log(optionValues[0]);
    const onChange = (value: any) => {
        setOptionValues([
            options.find((option: any) => option.name === value).id,
        ]);
    };

    return (
        <Box>
            <RadioGroup
                onChange={onChange}
                value={
                    options.find((option: any) => option.id === optionValues[0])
                        ?.name
                }
            >
                <Stack direction={"row"} spacing={12}>
                    {options.map((option: any) => (
                        <WrapperRadio key={option.name}>
                            <Radio value={option.name} colorScheme="blue">
                                {option.name}
                            </Radio>
                        </WrapperRadio>
                    ))}
                </Stack>
            </RadioGroup>
        </Box>
    );
};

const YesNoOption = ({ options, optionValues, setOptionValues }: any) => {
    const [isYes, setIsYes] = useState(false);

    const onChange = (values: any[]) => {
        setOptionValues(
            values.map(
                (value) =>
                    options.find((option: any) => option.name === value).id
            )
        );
    };

    return (
        <Stack w="full">
            <RadioGroup>
                <Stack direction={"row"} spacing={12}>
                    <WrapperRadio>
                        <Radio
                            value={"yes"}
                            colorScheme="blue"
                            isChecked={isYes}
                            onChange={() => setIsYes(!isYes)}
                        >
                            Yes
                        </Radio>
                    </WrapperRadio>
                    <WrapperRadio>
                        <Radio
                            value={"no"}
                            colorScheme="blue"
                            isChecked={!isYes}
                            onChange={() => setIsYes(!isYes)}
                        >
                            No
                        </Radio>
                    </WrapperRadio>
                </Stack>
            </RadioGroup>
            {isYes && (
                <SimpleGrid columns={2} spacingY={4} mt={4}>
                    <Box>
                        <Text>Please choose required features below:</Text>
                    </Box>
                    <Box></Box>
                    <CheckboxGroup
                        onChange={onChange}
                        value={optionValues.map(
                            (optionValue: any) =>
                                options.find(
                                    (option: any) => option.id === optionValue
                                ).name
                        )}
                    >
                        <Box>
                            <Text fontWeight={"bold"}>Enough</Text>
                            <Stack>
                                {options
                                    .filter(
                                        (option: { type: string }) =>
                                            option.type === "ENOUGH"
                                    )
                                    .map((option: any) => (
                                        <Checkbox
                                            key={option.name}
                                            value={option.name}
                                        >
                                            {option.name}
                                        </Checkbox>
                                    ))}
                            </Stack>
                        </Box>

                        <Box>
                            <Text fontWeight={"bold"}>Additional</Text>
                            <Stack>
                                {options
                                    .filter(
                                        (option: { type: string }) =>
                                            option.type === "ADDITIONAL"
                                    )
                                    .map((option: any) => (
                                        <Checkbox
                                            key={option.name}
                                            value={option.name}
                                        >
                                            {option.name}
                                        </Checkbox>
                                    ))}
                            </Stack>
                        </Box>
                    </CheckboxGroup>
                </SimpleGrid>
            )}
        </Stack>
    );
};

export default BlockChooseQuestion;
