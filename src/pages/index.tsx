import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Icon,
    IconProps,
    Skeleton,
    Stack,
    Text,
    useBreakpointValue,
    VStack,
} from "@chakra-ui/react";
import CustomButton from "components/common/CustomBottom";
import Loading from "components/Loading";
import useCurrentUser from "lib/hooks/useCurrentUser";
import useUserSelections from "lib/hooks/useUserSelections";
import Header from "lib/layout/Header";
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

    return (
        <Box>
            {/* userLoading && */}
            {isCurrentUserLoading ? (
                <Loading />
            ) : (
                <Flex flexDirection="column" gap={10}>
                    <Header />
                    <Text fontSize={["18px", "20px"]} fontWeight="bold">
                        Hi, {currentUser && currentUser.name}! Which function
                        you want to use below?
                    </Text>
                    <Stack direction="row">
                        <CustomButton onClick={() => router.push("/generate")}>
                            Generate document
                        </CustomButton>
                        <CustomButton>Generate code project</CustomButton>
                    </Stack>
                    <Heading size="md">Your documents</Heading>
                    <Grid
                        templateColumns={["repeat(1, 1fr)", "repeat(3, 1fr)"]}
                        gap={6}
                    >
                        {selections.length === 0 ? (
                            <Text>You have no documents yet!</Text>
                        ) : (
                            <>
                                {selections.map((selection) => (
                                    <GridItem
                                        onClick={() => {
                                            router.push(
                                                `/documents/${selection.id}`
                                            );
                                        }}
                                        key={selection.id}
                                        p={4}
                                        borderRadius={12}
                                        cursor="pointer"
                                        fontWeight="bold"
                                        _hover={{
                                            bg: "blackAlpha.300",
                                        }}
                                        bg="blackAlpha.200"
                                    >
                                        {selection.projectName}
                                    </GridItem>
                                ))}
                            </>
                        )}
                    </Grid>
                </Flex>
            )}
        </Box>
    );
};

export default HomePage;
