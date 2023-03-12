import { Box, Button, FormControl } from "@chakra-ui/react";
import ChooseDocumentType from "components/home-page/ChooseDocumentType";
import ChooseAppOptions from "components/home-page/ChooseAppOptions";
import { NextPage } from "next";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const Home: NextPage = () => {
    const [documentType, setDocumentType] = useState(undefined);

    const methods = useForm();
    const { handleSubmit } = methods;

    const onSubmit = (values: any) => {
        console.log(values);
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
