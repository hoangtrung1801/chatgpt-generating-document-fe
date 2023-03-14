import { Box, Button, FormControl, HStack } from "@chakra-ui/react";
import ChooseDocumentType from "components/home-page/ChooseDocumentType";
import ChooseAppOptions from "components/home-page/ChooseAppOptions";
import { NextPage } from "next";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import createSelection from "lib/api/createSelection";
import useSelectionStore from "stores/useSelectionStore";
import generateAnswerWithSelection from "lib/api/generateAnswerWithSelection";
import useResultStore from "stores/useResultStore";

const Home: NextPage = () => {
    const router = useRouter();
    const methods = useForm();
    const { handleSubmit } = methods;

    const [isLoading, setIsLoading] = useState(false);
    const [documentType, setDocumentType] = useState(undefined);

    const options = useSelectionStore((state) => state.options);
    const setResult = useResultStore((state) => state.setResult);

    const onSubmit = (values: any) => {
        setIsLoading(true);
        const { category } = values;
        createSelection(category.id, options)
            .then((selectionData) => {
                console.log("selectionData", selectionData);
                const selectionId = selectionData.data.id;

                generateAnswerWithSelection(selectionId).then((answerData) => {
                    console.log(answerData);

                    setResult(answerData.data.answer);
                    router.push("/result", {});
                    alert("successfull");
                });
            })
            .catch((error) => {
                console.error("error", error);
            });
    };

    return (
        <Box minHeight="70vh" w="full" bg="blue.100" p={8}>
            {isLoading ? (
                <Box
                    w="100%"
                    h="70vh"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        isLoading
                        loadingText="Loading"
                        colorScheme="teal"
                        variant="outline"
                        spinnerPlacement="end"
                    ></Button>
                </Box>
            ) : (
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box h={"100%"}>
                            {documentType ? (
                                <ChooseAppOptions />
                            ) : (
                                <ChooseDocumentType
                                    setDocumentType={setDocumentType}
                                />
                            )}
                        </Box>
                    </form>
                </FormProvider>
            )}

            {/* {isLoading && (
                <Button
                    isLoading
                    colorScheme="blue"
                    spinner={<BeatLoader size={8} color="white" />}
                >
                    Click me
                </Button>
            )} */}
        </Box>
    );
};

export default Home;
