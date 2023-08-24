import { Box } from "@chakra-ui/react";
import { LayoutCreateProject } from "components/create-project/components/Layout";
import { CustomToast } from "components/CustomToast";
import { ChooseAppOptions } from "components/document-page/ChooseAppOptions";
import Loading from "components/Loading";
import { movePage } from "components/motion";
import { motion } from "framer-motion";
import createSelection from "lib/api/createSelection";
import generateDocument from "lib/api/generateDocument";
import useGetQuestions from "lib/hooks/useGetQuestions";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useCreateProject, useTableContents } from "stores";

const Document: NextPage = () => {
    const router = useRouter();
    const step = Number(router.query?.step) || 0;
    const { columns, updateColumns } = useTableContents();

    const [loading, setLoading] = useState(false);
    const data = useCreateProject((state) => state.data);

    const methods = useForm();
    const { watch, handleSubmit } = methods;
    const [valueSelection] = watch(["selectedOptions"]);

    const renderStep = () => {
        if (step >= 0)
            return <ChooseAppOptions backStep={backStep} nextStep={nextStep} />;
    };

    const { addToast } = CustomToast();
    const { questions } = useGetQuestions(data.appId);
    // console.log(questions.length);
    // console.log(step - 1);

    const nextStep = () => {
        // step preview document
        // console.log("valueSelection: ", valueSelection);
        if (step <= questions.length) {
            if (step === questions.length) {
                handleSubmit(onSubmit)();
            } else {
                router.query.step = String(step + 1);
                router.push(router);
            }
        }
        if (step > questions.length) {
            router.push("/");
        }

        // router.query.step = String(step + 1);
        // router.push(router);
        // if (step === questions.length) {
        //     handleSubmit(onSubmit)();
        // }
    };

    const backStep = () => {
        router.query.step = String(Math.max(step - 1, 0));
        router.push(router);
    };

    const onSubmit = async (values) => {
        try {
            console.log({ values });
            const body = { ...values, ...data };
            // delete body.category;
            body.selectedOptions = Object.values(body.selectedOptions).reduce(
                (prev: Array<Number>, cur: any) => {
                    if (!cur) return prev;
                    return [...prev, ...cur];
                },
                []
            );

            // Test
            body.username = "Hoang Trung";
            console.log("body", { body });
            console.log("columns: ", columns);

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

            router.push(`/documentsTest/${selection.id}`);
            setLoading(false);
        } catch {
            addToast(Response);
        }
    };

    if (loading) return <Loading />;

    return (
        <LayoutCreateProject page="Create project">
            <Box w="container.md" zIndex={2} py={4}>
                <FormProvider {...methods}>
                    <Box as={motion.div} {...movePage}>
                        {renderStep()}
                    </Box>
                </FormProvider>
            </Box>
        </LayoutCreateProject>
    );
};

export default Document;
