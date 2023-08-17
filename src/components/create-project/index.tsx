import { Box, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import StepChooseApps from "./components/StepChooseApps";
import StepChooseCategories from "./components/StepChooseCategories";
import StepChooseDocumentType from "./components/StepChooseDocumentType";
import StepStepTypeShortDesc from "./components/StepTypeShortDesc";
import { defaultValues, documentModes } from "./data";

type Props = {};

const CreateProjectSection = (props: Props) => {
    const form = useForm({ defaultValues });
    const { watch } = form;
    const [documentMode, category, appId, step] = watch([
        "documentMode",
        "category",
        "appId",
        "step",
    ]);
    const AvailableModeRender = () => {
        return (
            <>
                <Box hidden={!(step >= 1)}>
                    <StepChooseCategories form={form} />
                </Box>
                <Box hidden={!(step >= 2)}>
                    <StepChooseApps form={form} />
                </Box>
                <Box hidden={!(step >= 3)}>
                    <StepStepTypeShortDesc form={form} />
                </Box>
            </>
        );
    };
    const renderSteps = () => {
        // mode available
        if (documentMode === documentModes.available)
            return AvailableModeRender();
        if (documentMode === documentModes.new) return;
    };

    return (
        <Stack spacing="24px" pt="48px" w="container.md" zIndex={2}>
            <StepChooseDocumentType form={form} />
            {renderSteps()}
        </Stack>
    );
};

export default CreateProjectSection;
