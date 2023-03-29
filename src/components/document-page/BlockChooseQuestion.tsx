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
import useGetQuestion from "lib/hooks/useGetQuestion";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useConfirmStore from "stores/useCofirmOptions";
import useSelectionStore from "stores/useSelectionStore";

const BlockChooseQuestion = ({ questionId, nextStep }: any) => {
    // const addOptions = useSelectionStore((state) => state.addOptions);
    // const numberBack = useSelectionStore((state) => state.updateNumberBack);

    const [optionValues, setOptionValues] = useState([]);
    const [currentOption, setCurrentOption] = useState({});

    const { question, isLoading: questionIsLoading } =
        useGetQuestion(questionId);
    const { addconfirmOption, confirmOptions } = useConfirmStore();

    useEffect(() => {
        console.log(confirmOptions);
    }, [confirmOptions, currentOption]);

    const onSave = () => {
        // numberBack(optionValues.length);
        addconfirmOption(currentOption);
        // addOptions([...optionValues]);
        nextStep();
    };

    return (
        <Box>
            {questionIsLoading ? (
                <Button
                    isLoading
                    loadingText="Loading"
                    colorScheme="teal"
                    variant="outline"
                    spinnerPlacement="end"
                ></Button>
            ) : (
                <VStack spacing={6}>
                    <Heading>{question.name}</Heading>
                    <Box>
                        {!questionIsLoading && question.type === "single" && (
                            <SingleOption
                                question_id={question.id}
                                options={question.options}
                                setOptionValues={setOptionValues}
                                optionValues={optionValues}
                                setCurrentOption={setCurrentOption}
                                currentOption={currentOption}
                            />
                        )}

                        {!questionIsLoading && question.type === "yesno" && (
                            <YesNoOption
                                options={question.options}
                                optionValues={optionValues}
                                setOptionValues={setOptionValues}
                                setCurrentOption={setCurrentOption}
                                question_id={question.id}
                                currentOption={currentOption}
                            />
                        )}
                    </Box>
                    <Box textAlign={"right"} mt={8} w="full">
                        <Button colorScheme={"blue"} onClick={onSave}>
                            Save & continue
                        </Button>
                    </Box>
                </VStack>
            )}
        </Box>
    );
};

const SingleOption = ({
    options,
    setOptionValues,
    optionValues,
    setCurrentOption,
    question_id,
    currentOption,
}: any) => {
    // console.log(optionValues[0]);
    const onChange = (value: any) => {
        setCurrentOption({
            question_id: question_id,
            answers: [value],
            option_id: [
                options.find((option: any) => option.name === value).id,
            ],
        });
        // setOptionValues([
        //     options.find((option: any) => option.name === value).id,
        // ]);
    };

    return (
        <Box>
            <RadioGroup
                onChange={onChange}
                value={
                    options.find(
                        (option: any) => option.id === currentOption.option_id
                    )?.name
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

const YesNoOption = ({
    options,
    optionValues,
    setOptionValues,
    setCurrentOption,
    question_id,
    currentOption,
}: any) => {
    const [isYes, setIsYes] = useState(false);

    const onChange = (values: any[]) => {
        setCurrentOption({
            question_id: question_id,
            answers: values,
            option_id: values.map(
                (value) =>
                    options.find((option: any) => option.name === value).id
            ),
        });
        // setOptionValues(
        //     values.map(
        //         (value) =>
        //             options.find((option: any) => option.name === value).id
        //     )
        // );
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
                            onChange={() => setIsYes(true)}
                        >
                            Yes
                        </Radio>
                    </WrapperRadio>
                    <WrapperRadio>
                        <Radio
                            value={"no"}
                            colorScheme="blue"
                            isChecked={!isYes}
                            // defaultChecked={isYes}
                            onChange={() => {
                                setIsYes(false);
                                setCurrentOption({
                                    question_id: question_id,
                                    answers: ["No"],
                                });
                            }}
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
                        value={currentOption.option_id?.map(
                            (optionId: any) =>
                                options.find(
                                    (option: any) => option.id === optionId
                                ).name
                        )}
                    >
                        <Box>
                            <Text fontWeight={"bold"}>Enough</Text>
                            <Stack>
                                {options
                                    .filter(
                                        (option: { type: string }) =>
                                            option.type === "enough"
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
                                            option.type === "additional"
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
