import { Box, Button } from "@chakra-ui/react";
import ChooseDocumentType from "components/document-page/ChooseDocumentType";
import ChooseAppOptions from "components/document-page/ChooseAppOptions";
import { NextPage } from "next";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import createSelection from "lib/api/createSelection";
import generateAnswerWithSelection from "lib/api/generateAnswerWithSelection";
import useResultStore from "stores/useResultStore";
import useConfirmStore from "stores/useCofirmOptions";
import TypeShortDescriptionApp from "components/document-page/TypeShortDescriptionApp";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Loading from "components/Loading";
import createTodos from "lib/api/createTodos";

type shortDescription = {
    name: string;
    description: string;
};

const Document: NextPage = () => {
    const router = useRouter();
    const methods = useForm();
    const { handleSubmit } = methods;

    const [isLoading, setIsLoading] = useState(false);
    const [documentType, setDocumentType] = useState(undefined);
    const [outStep, setOutStep] = useState(0);
    const [shortDescriptionApp, setShortDescriptionApp] =
        useState<shortDescription>({ name: "", description: "" });
    const [isTyped, setIsTyped] = useState(true);

    // const options = useSelectionStore((state) => state.options);
    const setResult = useResultStore((state) => state.setResult);
    const { confirmOptions } = useConfirmStore();

    const handleDescriptionChange = (e: any) =>
        setShortDescriptionApp({
            name: shortDescriptionApp.name,
            description: e.target.value,
        });
    const handleNameChange = (e: any) =>
        setShortDescriptionApp({
            name: e.target.value,
            description: shortDescriptionApp.description,
        });

    const nextOutStep = () => {
        setOutStep(outStep + 1);
    };
    const prevOutStep = () => {
        setOutStep(outStep - 1);
    };
    const handleSubmitDescription = () => {
        if (shortDescriptionApp.description && shortDescriptionApp.name) {
            console.log("shortDescriptionApp : ", shortDescriptionApp);
            setIsTyped(true);
            nextOutStep();
        } else {
            setIsTyped(false);
        }
    };
    console.log("outStep : ", outStep);
    const onSubmit = (values: any) => {
        console.log("confirmOptions : ", confirmOptions);
        const result = confirmOptions
            .flatMap((item) => item.option_id)
            .filter((option) => option !== undefined);
        setIsLoading(true);
        // console.log("result : ", result);
        const { category } = values;
        // router.push("/result");
        if (result) {
            createSelection(
                category.id,
                result,
                shortDescriptionApp.name,
                shortDescriptionApp.description
            )
                .then((selectionData) => {
                    console.log("selectionData", selectionData);
                    const selectionId = selectionData.data.id;

                    generateAnswerWithSelection(selectionId).then(
                        (answerData) => {
                            if (answerData.data) {
                                setResult(answerData.data);
                                createTodos(answerData.data.id).then(
                                    (todoRes) => {
                                        if (todoRes.data) {
                                            router.push("/result");
                                            alert("successfull");
                                        }
                                    }
                                );
                            }
                            console.log(answerData);
                        }
                    );
                })
                .catch((error) => {
                    console.error("error", error);
                });
        }
    };

    return (
        <Box
            margin="50px auto"
            maxWidth={"container.xl"}
            transition="0.5s ease-out"
            minHeight="80vh"
            w="full"
            bg="#eaeaf1"
            // minHeight="70vh"
            // w="full"
            // bg="blue.100"
            // bg={outStep > 1 ? "#f8f8fb" : "blue.100"}
            // bg="#f8f8fb"
            p={8}
        >
            {outStep === 0 ? (
                <TypeShortDescriptionApp
                    isTyped={isTyped}
                    shortDescriptionApp={shortDescriptionApp}
                    handleNameChange={handleNameChange}
                    handleDescriptionChange={handleDescriptionChange}
                    handleSubmitDescription={handleSubmitDescription}
                />
            ) : (
                <Box>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <FormProvider {...methods}>
                            {outStep < 3 && (
                                <Button
                                    colorScheme="blue"
                                    leftIcon={<ArrowBackIcon />}
                                    size={"lg"}
                                    mb="20px"
                                    onClick={prevOutStep}
                                >
                                    Back
                                </Button>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Box h={"100%"}>
                                    {outStep >= 2 && documentType === "app" && (
                                        <Box>
                                            <ChooseAppOptions
                                                shortDescriptionApp={
                                                    shortDescriptionApp
                                                }
                                                setOutStep={setOutStep}
                                            />
                                        </Box>
                                    )}
                                    {outStep === 1 && (
                                        <ChooseDocumentType
                                            setDocumentType={setDocumentType}
                                            setOutStep={setOutStep}
                                        />
                                    )}
                                </Box>
                            </form>
                        </FormProvider>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Document;
