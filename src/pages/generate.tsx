import { Box, Button } from "@chakra-ui/react";
import { CustomToast } from "components/CustomToast";
import {
    ChooseApp,
    ChooseAppCategory,
    ChooseAppOptions,
    PreviewDocument,
    TypeShortDescriptionApp,
} from "components/document-page";
import Loading from "components/Loading";
import { movePage } from "components/motion";
import { motion } from "framer-motion";
import createSelection from "lib/api/createSelection";
import generateDocument from "lib/api/generateDocument";
import useGetQuestions from "lib/hooks/useGetQuestions";
import useOptions from "lib/hooks/useOptions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Document: NextPage = () => {
    const router = useRouter();
    const step = Number(router.query?.step) || 0;

    const [loading, setLoading] = useState(false);

    const methods = useForm();
    const { watch, handleSubmit } = methods;

    const formValues = watch();
    const appId = watch("appId");

    const renderStep = () => {
        // if (step === 0) return <TypeShortDescriptionApp nextStep={nextStep} />;
        // if (step === 1)
        //     return (
        //         <ChooseAppCategory backStep={backStep} nextStep={nextStep} />
        //     );
        // if (step === 2)
        //     return <ChooseApp backStep={backStep} nextStep={nextStep} />;
        // if (questions.length !== 0 && step >= 3 && step - 2 <= questions.length)
        //     return <ChooseAppOptions backStep={backStep} nextStep={nextStep} />;

        return <PreviewDocument />;
    };

    const { questions } = useGetQuestions(appId);

    const { addToast } = CustomToast();

    const nextStep = () => {
        if (questions.length !== 0 && step - 2 === questions.length) {
            handleSubmit(onSubmit)();
        }
        router.query.step = String(step + 1);
        router.push(router);
        console.log({ formValues });
    };

    const backStep = () => {
        router.query.step = String(Math.max(step - 1, 0));
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

            // API - Create Selection
            setLoading(true);
            const response = await createSelection(body);
            const selection = response.data;
            console.log({ selection });

            // API - Generate Document
            const response2 = await generateDocument(selection.id);
            const outline = response2.data;
            console.log({ outline });
            addToast(response);

            router.push(`/documents/${selection.id}`);
            setLoading(false);
        } catch {
            addToast(Response);
        }
    };

    if (loading) return <Loading />;

    return (
        <Box py={4}>
            <FormProvider {...methods}>
                <Box as={motion.div} {...movePage}>
                    {renderStep()}
                </Box>
            </FormProvider>
        </Box>
    );
};

export default Document;
