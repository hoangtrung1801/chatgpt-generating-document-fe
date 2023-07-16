import { Box, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import Loading from "components/Loading";
import useCategoryWithId from "lib/hooks/useCategoryWithId";
import { useFormContext } from "react-hook-form";

const ChooseApp = ({ nextStep }) => {
    const { watch, setValue } = useFormContext();
    const categoryId = watch("category");

    const {
        category: { apps },
        isLoading,
    } = useCategoryWithId(categoryId);

    const onClick = (app) => {
        console.log({ app });
        // clearOptions();
        setValue("appId", app.id);
        nextStep();
    };

    return (
        <Box>
            <Heading textAlign={["center", "left"]}>Choose App</Heading>
            <Box mt={10}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <SimpleGrid columns={[1, 1, 2, 4]} spacing={[5, 10]}>
                        {apps.map((app) => (
                            <Box mx={"auto"} key={app.id}>
                                {app.status ? (
                                    <Box
                                        rounded="full"
                                        w="240px"
                                        h="60px"
                                        overflow="hidden"
                                        transition="ease-in-out .5s"
                                        onClick={() => onClick(app)}
                                        _hover={{
                                            transform: "scale(1.1)",
                                        }}
                                        key={app.id}
                                    >
                                        <Image
                                            objectFit="fill"
                                            w="full"
                                            h="full"
                                            cursor="pointer"
                                            alt={app.name}
                                            src={app.thumbnail}
                                        />
                                    </Box>
                                ) : (
                                    <Box
                                        w="240px"
                                        h="60px"
                                        overflow="hidden"
                                        cursor="pointer"
                                        transition="ease-in-out .5s"
                                        position="relative"
                                        _hover={{
                                            transform: "scale(1.1)",
                                        }}
                                        key={app.id}
                                    >
                                        <Image
                                            w="full"
                                            h="full"
                                            cursor="pointer"
                                            alt={app.name}
                                            src={app.thumbnail}
                                        />
                                        <Box
                                            position="absolute"
                                            borderRadius="33px"
                                            top="0"
                                            right="0"
                                            left="0"
                                            bottom="0"
                                            bg="rgba(0,0,0,.8)"
                                        ></Box>
                                        <Box
                                            position="absolute"
                                            color="white"
                                            fontSize="17px"
                                            textTransform="capitalize"
                                            top="17px"
                                            left="0"
                                            right="0"
                                            textAlign="center"
                                            // opacity={isComming ? 1 : 0}
                                            transition="ease-in-out .5s"
                                        >
                                            Comming soon!
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </SimpleGrid>
                )}
            </Box>
        </Box>
    );
};

export default ChooseApp;
