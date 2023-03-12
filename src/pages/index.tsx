import { Box, Button, FormControl } from "@chakra-ui/react";
import ChooseDocumentType from "components/home-page/ChooseDocumentType";
import ChooseAppOptions from "components/home-page/ChooseAppOptions";
import { NextPage } from "next";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import createSelection from "lib/api/createSelection";
import useSelectionStore from "stores/useSelectionStore";

const Home: NextPage = () => {
    const methods = useForm();
    const { handleSubmit } = methods;

    const [documentType, setDocumentType] = useState(undefined);

    const options = useSelectionStore((state) => state.options);

    const onSubmit = (values: any) => {
        const { category } = values;
        createSelection(category.id, options).then((data) => {
            alert("successfull");
        });
    };

    return (
        <Box minHeight="70vh" w="full" bg="blue.100" p={8}>
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
        </Box>
    );
};

export default Home;
