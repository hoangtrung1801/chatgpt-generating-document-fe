import { Box, Grid, Stack, Text } from "@chakra-ui/react";
import { DocumentCard } from "components/homepage";
import Loading from "components/Loading";
import useCurrentUser from "lib/hooks/useCurrentUser";
import useUserSelections from "lib/hooks/useUserSelections";
import LayoutWithSidebar from "lib/layout/LayoutWithSidebar";
import { NextPage } from "next";
import { useRouter } from "next/router";
const HomePage: NextPage = () => {
    const router = useRouter();

    const {
        currentUser,
        isLoading: isCurrentUserLoading,
        error,
    } = useCurrentUser();
    const { selections, isLoading: isUserSelectionLoading } =
        useUserSelections();
    console.log("selections: ", selections);
    return (
        <LayoutWithSidebar>
            <Box>
                {/* userLoading && */}
                {isCurrentUserLoading ? (
                    <Loading />
                ) : (
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
                                {selections?.length === 0 ? (
                                    <Text>You have no documents yet!</Text>
                                ) : (
                                    <>
                                        {selections &&
                                            selections.map((selection) => (
                                                <DocumentCard
                                                    selection={selection}
                                                    key={selection.id}
                                                />
                                            ))}
                                    </>
                                )}
                            </Grid>
                        </Stack>
                    </Stack>
                )}
            </Box>
        </LayoutWithSidebar>
    );
};

export default HomePage;
