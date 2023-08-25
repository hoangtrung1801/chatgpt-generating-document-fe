import { Box, Grid, Stack } from "@chakra-ui/react";
import { DocumentCard } from "components/homepage";
import useUserSelections from "lib/hooks/useUserSelections";
import LayoutWithSidebar from "lib/layout/LayoutWithSidebar";
import { useGlobalLoading } from "stores/useGlobalLoading";
const HomePage = () => {
    const { selections, isLoading: isUserSelectionLoading } =
        useUserSelections();
    const toggleLoading = useGlobalLoading((state) => state.toggleLoading);
    const closeLoading = useGlobalLoading((state) => state.closeLoading);
    if (isUserSelectionLoading) return toggleLoading("Wait for user selection");
    if (!isUserSelectionLoading) {
        closeLoading();
        return (
            <LayoutWithSidebar>
                <Box>
                    <Stack spacing={8}>
                        {/* <Header /> */}

                        <Stack spacing={2}>
                            <Grid
                                templateColumns={[
                                    "repeat(1, 1fr)",
                                    "repeat(4, 1fr)",
                                ]}
                                gap={6}
                            >
                                {selections &&
                                    selections.map((selection) => (
                                        <DocumentCard
                                            selection={selection}
                                            key={selection.id}
                                        />
                                    ))}
                            </Grid>
                        </Stack>
                    </Stack>
                </Box>
            </LayoutWithSidebar>
        );
    }
};

export default HomePage;
