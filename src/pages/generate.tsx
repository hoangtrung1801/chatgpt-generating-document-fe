import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Divider, Stack, Text } from "@chakra-ui/react";
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
        try {
            console.log({ values });
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
            addToast(response);

            router.push(`/documents/${selection.id}`);
        } catch {
            addToast(Response);
        }
    };

    useEffect(() => {
        console.log("query", router.query);
    }, [router.query]);

    return (
        <Box w="full" p={8}>
            <FormProvider {...methods}>
                {step === 0 && <TypeShortDescriptionApp nextStep={nextStep} />}
                {step !== 0 && (
                    <Box>
                        <Stack direction="row" justifyContent="space-between">
                            <Button
                                variant="unstyled"
                                onClick={() => backStep()}
                            >
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <Text>Back</Text>
                                    <ArrowBackIcon />
                                </Stack>
                            </Button>
                            <Button
                                variant="unstyled"
                                onClick={() => nextStep()}
                            >
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <ArrowForwardIcon />
                                    <Text>Next</Text>
                                </Stack>
                            </Button>
                        </Stack>
                        <Divider color="blackAlpha.800" />
                    </Box>
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
