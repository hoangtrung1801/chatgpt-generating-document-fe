import { Box, Button } from "@chakra-ui/react";
import { CustomToast } from "components/CustomToast";
import ChooseApp from "components/document-page/ChooseApp";
import ChooseAppCategory from "components/document-page/ChooseAppCategory";
import ChooseAppOptions from "components/document-page/ChooseAppOptions";
import TypeShortDescriptionApp from "components/document-page/TypeShortDescriptionApp";
import createSelection from "lib/api/createSelection";
import generateDocument from "lib/api/generateDocument";
import useGetQuestions from "lib/hooks/useGetQuestions";
import useOptions from "lib/hooks/useOptions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type shortDescription = {
    name: string;
    description: string;
};

const Document: NextPage = () => {
    const router = useRouter();
    const step = Number(router.query?.step) || 0;

    const methods = useForm();
    const { watch, handleSubmit } = methods;

    const formValues = watch();
    const appId = watch("appId");

    const { questions } = useGetQuestions(appId);
    const { options } = useOptions();

    const { addToast } = CustomToast();

    const nextStep = () => {
        router.query.step = String(step + 1);
        router.push(router);
        console.log({ formValues });
    };

    const backStep = () => {
        router.query.step = String(Math.max(step - 1, 0));
        router.push(router);
    };

    const gotoStep = (step: number) => {
        router.query.step = String(step);
        router.push(router);
    };

    const onSubmit = async (values) => {
        console.log({ values });
        // console.log("confirmOptions : ", confirmOptions);
        // const result = confirmOptions
        //     .flatMap((item) => item.option_id)
        //     .filter((option) => option !== undefined);
        // setIsLoading(true);
        // // console.log("result : ", result);
        // const { category } = values;
        // // router.push("/result");
        // if (result) {
        //     createSelection(
        //         category.id,
        //         result,
        //         shortDescriptionApp.name,
        //         shortDescriptionApp.description
        //     )
        //         .then((selectionData) => {
        //             console.log("selectionData", selectionData);
        //             addToast({
        //                 message: "Your document generation is in progress!",
        //                 type: "info",
        //             });
        //             const selectionId = selectionData.data.id;

        //             generateAnswerWithSelection(selectionId).then(
        //                 (answerData) => {
        //                     if (answerData.data) {
        //                         setResult(answerData.data);
        //                         addToast({
        //                             message:
        //                                 "The system has generated the basic content of the document, waiting for creating your todos!",
        //                             type: "info",
        //                         });
        //                         createTodos(answerData.data.id).then(
        //                             (todoRes) => {
        //                                 if (todoRes.data) {
        //                                     router.push("/result");
        //                                     addToast({
        //                                         message:
        //                                             "Your document was generated!",
        //                                         type: "success",
        //                                     });
        //                                 }
        //                             }
        //                         );
        //                     }
        //                     console.log(answerData);
        //                 }
        //             );
        //         })
        //         .catch((error) => {
        //             console.error("error", error);
        //         });
        // }

        const body = { ...values };
        delete body.category;
        body.selectedOptions = Object.values(body.selectedOptions).reduce(
            (prev: Array<Number>, cur: any) => {
                if (!cur) return prev;
                return [...prev, ...cur];
            },
            []
        );

        // Test
        body.username = "Hoang Trung";

        console.log({ body });
        // console.log(
        //     body.selectedOptions.filter(
        //         (id) => !options.find((option) => option.id === id)
        //     )
        // );

        // API - Create Selection
        const response = await createSelection(body);
        const selection = response.data;
        console.log({ selection });

        // API - Generate Document
        const response2 = await generateDocument(selection.id);
        const outline = response2.data;
        console.log({ outline });

        router.push("/result");
    };

    useEffect(() => {
        console.log("query", router.query);
    }, [router.query]);

    return (
        <Box
            margin="50px auto"
            maxWidth={"container.xl"}
            transition="0.5s ease-out"
            minHeight={["50vh", "80vh"]}
            w="full"
            bg="#eaeaf1"
            p={8}
        >
            <FormProvider {...methods}>
                {step === 0 && <TypeShortDescriptionApp nextStep={nextStep} />}
                {step !== 0 && (
                    <>
                        <Button onClick={() => backStep()}>Back</Button>
                        <Button onClick={() => nextStep()}>Next</Button>
                    </>
                )}
                {step === 1 && <ChooseAppCategory nextStep={nextStep} />}
                {step === 2 && <ChooseApp nextStep={nextStep} />}
                {step >= 3 && <ChooseAppOptions nextStep={nextStep} />}
                {step === questions.length + 3 && (
                    <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                )}
            </FormProvider>
        </Box>
    );
};

export default Document;
