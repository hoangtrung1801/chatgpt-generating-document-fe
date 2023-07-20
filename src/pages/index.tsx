import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import CustomButton from "components/common/CustomButton";
import { DocumentCard } from "components/homepage";
import Loading from "components/Loading";
import useCurrentUser from "lib/hooks/useCurrentUser";
import useUserSelections from "lib/hooks/useUserSelections";
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
        <Box>
            {/* userLoading && */}
            {isCurrentUserLoading ? (
                <Loading />
            ) : (
                <Stack spacing={8}>
                    {/* <Header /> */}
                    <Stack spacing={8}>
                        <Heading size="lg" color="blackAlpha.800">
                            Hi, {currentUser && currentUser.name}! Which
                            function you want to use below?
                        </Heading>
                        <Stack direction="row">
                            <CustomButton
                                maxW="200px"
                                onClick={() => router.push("/generate")}
                            >
                                Generate document
                            </CustomButton>
                            <CustomButton maxW="200px">
                                Generate code project
                            </CustomButton>
                        </Stack>
                    </Stack>
                    <Stack spacing={2}>
                        <Heading size="lg" color="blackAlpha.800">
                            Your documents
                        </Heading>
                        <Grid
                            templateColumns={[
                                "repeat(1, 1fr)",
                                "repeat(3, 1fr)",
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
    );
};

export default HomePage;
