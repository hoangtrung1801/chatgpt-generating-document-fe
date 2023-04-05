import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
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
import Loading from "components/Loading";
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
    const [currentOption, setCurrentOption] = useState({
        question_id: "",
        answers: [],
        option_id: [],
    });
    const [isSelected, setIsSelected] = useState(true);

    const { question, isLoading: questionIsLoading } =
        useGetQuestion(questionId);
    const { addconfirmOption, confirmOptions } = useConfirmStore();

    useEffect(() => {
        console.log(confirmOptions);
    }, [confirmOptions, currentOption]);

    const onSave = () => {
        // numberBack(optionValues.length);
        if (currentOption.answers.length > 0) {
            addconfirmOption(currentOption);
            setIsSelected(true);
            nextStep();
        } else {
            setIsSelected(false);
        }
        // addOptions([...optionValues]);
    };

    return (
        <Box>
            {questionIsLoading ? (
                <Loading />
            ) : (
                <VStack spacing={[10, 16]}>
                    <Heading as={"h3"}>{question.name}</Heading>
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
                        <Button
                            w={["100%", "auto"]}
                            size="lg"
                            colorScheme={"blue"}
                            onClick={onSave}
                        >
                            Save & continue
                        </Button>
                    </Box>
                    <Box justifyContent="center" flex={1}>
                        <Alert
                            rounded="full"
                            hidden={isSelected}
                            status="error"
                        >
                            <AlertIcon />
                            <AlertDescription>
                                Please select some options
                            </AlertDescription>
                        </Alert>
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
        <Box mt={10}>
            <RadioGroup
                onChange={onChange}
                value={
                    options.find(
                        (option: any) => option.id === currentOption.option_id
                    )?.name
                }
            >
                <Stack
                    direction={["column", "column", "column", "row"]}
                    spacing={12}
                >
                    {options.map((option: any) => (
                        <WrapperRadio
                            transition="ease-all 2s"
                            borderColor={
                                currentOption.option_id.length > 0 &&
                                currentOption.option_id[0] === option.id
                                    ? "blue.600"
                                    : ""
                            }
                            bg={
                                currentOption.option_id.length > 0 &&
                                currentOption.option_id[0] === option.id
                                    ? "blue.200"
                                    : ""
                            }
                            p={10}
                            key={option.name}
                        >
                            <Radio
                                _checked={{ bg: "blue.300" }}
                                transition="ease-in-out .5s"
                                size="lg"
                                value={option.name}
                                colorScheme="blue"
                            >
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
    const [isYes, setIsYes] = useState<any>();
    const [isChecked, setIsChecked] = useState();

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
                <Stack
                    direction={["column", "column", "column", "row"]}
                    spacing={12}
                >
                    <WrapperRadio
                        fontWeight="bold"
                        _hover={{ bg: "blue.100" }}
                        borderColor={isYes && "blue.600"}
                        bg={isYes && "blue.200"}
                        minW={300}
                        p={10}
                    >
                        <Radio
                            size="lg"
                            value={"yes"}
                            colorScheme="blue"
                            isChecked={isYes}
                            onChange={() => {
                                setIsYes(true);
                                // setIsChecked(1);
                            }}
                        >
                            Yes
                        </Radio>
                    </WrapperRadio>
                    <WrapperRadio
                        fontWeight="bold"
                        minW={300}
                        p={10}
                        borderColor={isYes === false && "blue.600"}
                        bg={isYes === false && "blue.200"}
                    >
                        <Radio
                            size="lg"
                            value={"no"}
                            colorScheme="blue"
                            isChecked={!isYes}
                            // defaultChecked={isYes}

                            onChange={() => {
                                setIsYes(false);
                                // setIsChecked(0);
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
                <>
                    <Box>
                        <Text w="full" my="10px" fontSize="20px">
                            Please choose required features below:
                        </Text>
                    </Box>
                    <SimpleGrid columns={2} spacingY={4} mt={4}>
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
                                <Text
                                    mb="10px"
                                    fontSize="18px"
                                    fontWeight={"bold"}
                                >
                                    Enough
                                </Text>
                                <Stack>
                                    {options
                                        .filter(
                                            (option: { type: string }) =>
                                                option.type === "enough"
                                        )
                                        .map((option: any) => (
                                            <Checkbox
                                                borderColor="blue.400"
                                                size="lg"
                                                key={option.name}
                                                value={option.name}
                                            >
                                                {option.name}
                                            </Checkbox>
                                        ))}
                                </Stack>
                            </Box>

                            <Box>
                                <Text
                                    mb="10px"
                                    fontSize="18px"
                                    fontWeight={"bold"}
                                >
                                    Additional
                                </Text>
                                <Stack>
                                    {options
                                        .filter(
                                            (option: { type: string }) =>
                                                option.type === "additional"
                                        )
                                        .map((option: any) => (
                                            <Checkbox
                                                borderColor="blue.400"
                                                size="lg"
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
                </>
            )}
        </Stack>
    );
};

export default BlockChooseQuestion;
