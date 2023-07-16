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
import { CustomToast } from "components/CustomToast";
import Loading from "components/Loading";
import WrapperRadio from "components/WrapperRadio";
import useGetQuestion from "lib/hooks/useGetQuestion";
import { useEffect, useState } from "react";
import { RadioButtonGroupInput } from "react-admin";
import { useFormContext } from "react-hook-form";
import useConfirmStore from "stores/useCofirmOptions";
import useSelectionStore from "stores/useSelectionStore";

const BlockChooseQuestion = ({ questionId, nextStep }: any) => {
    const { setValue, watch } = useFormContext();
    const selectedOptions = watch("selectedOptions");

    const { question, isLoading } = useGetQuestion(questionId);

    const [optionValues, setOptionValues] = useState([]);
    const [currentOption, setCurrentOption] = useState({
        question_id: "",
        answers: [],
        option_id: [],
    });
    const { addToast } = CustomToast();

    const { addconfirmOption, confirmOptions } = useConfirmStore();

    const onChange = (values) => {
        console.log({ values });
        setValue(`selectedOptions.${questionId}`, values);
    };

    // useEffect(() => {
    //     console.log({ question });
    // }, [question]);

    // useEffect(() => {
    //     console.log({ selectedOptions });
    // }, [selectedOptions]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box>
            <VStack spacing={[10, 16]}>
                <Heading>{question.name}</Heading>
                <Box>
                    {["SINGLE", "YESNO"].includes(question.type) && (
                        <SingleOption
                            questionId={question.id}
                            options={question.options}
                            // onChange={onChange}
                        />
                    )}
                    {/* {question.type === "YESNO" && (
                        <SingleOption questionId={question.id} yesno={true} />
                    )} */}
                    {question.type === "MULTI" && (
                        <MultiOptions
                            questionId={question.id}
                            options={question.options}
                        />
                    )}

                    {/* {question.type === "YESNO" && (
                        <YesNoOption
                            options={question.options}
                            optionValues={optionValues}
                            setOptionValues={setOptionValues}
                            setCurrentOption={setCurrentOption}
                            question_id={question.id}
                        />
                    )} */}
                </Box>
                {/* <Box textAlign={"right"} mt={8} w="full">
                        <Button
                            w={["100%", "auto"]}
                            size="lg"
                            colorScheme={"blue"}
                            onClick={onSave}
                        >
                            Save & continue
                        </Button>
                    </Box> */}
            </VStack>
        </Box>
    );
};

const SingleOption = ({ questionId, options = [], yesno = false }) => {
    const { setValue: setFormValue } = useFormContext();

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

    return (
        <Box>
            <RadioGroup value={value} onChange={onChange}>
                <Stack direction={"column"}>
                    {options.map((option) => (
                        <Radio key={option.id} value={String(option.id)}>
                            {option.name}
                        </Radio>
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

    // return (
    //     <Box mt={10}>
    //         <RadioGroup onChange={onChange}>
    //             <Stack
    //                 direction={["column", "column", "column", "row"]}
    //                 spacing={12}
    //             >
    //                 {options.map((option: any) => (
    //                     <WrapperRadio
    //                         transition="ease-all 2s"
    //                         borderColor={
    //                             currentOptions.includes(option.id)
    //                                 ? "blue.600"
    //                                 : ""
    //                         }
    //                         bg={
    //                             currentOptions.includes(option.id)
    //                                 ? "blue.200"
    //                                 : ""
    //                         }
    //                         p={10}
    //                         key={option.id}
    //                     >
    //                         <Radio
    //                             _checked={{ bg: "blue.300" }}
    //                             transition="ease-in-out .5s"
    //                             size="lg"
    //                             value={option.id}
    //                             colorScheme="blue"
    //                         >
    //                             {option.name}
    //                         </Radio>
    //                     </WrapperRadio>
    //                 ))}
    //             </Stack>
    //         </RadioGroup>
    //     </Box>
    // );
};

const MultiOptions = ({ questionId, options }) => {
    const { setValue: setFormValue } = useFormContext();

    const [value, setValue] = useState([]);

    const onChange = (e) => {
        console.log(e);
        setValue(e);
        setFormValue(`selectedOptions.${questionId}`, e.map(Number));
    };

    return (
        <Box>
            <CheckboxGroup value={value} onChange={onChange}>
                <Stack direction={"column"}>
                    {options.map((option) => (
                        <Checkbox key={option.id} value={String(option.id)}>
                            {option.name}
                        </Checkbox>
                    ))}
                </Stack>
            </CheckboxGroup>
        </Box>
    );
};

export default BlockChooseQuestion;
