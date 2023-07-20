import { Box, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import Loading from "components/Loading";
import useCategoryWithId from "lib/hooks/useCategoryWithId";
import { useFormContext } from "react-hook-form";
import { LayoutGenerate } from "./components";

type TChooseApp = {
    nextStep: () => void;
    backStep: () => void;
};

export const ChooseApp = ({ nextStep, backStep }: TChooseApp) => {
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
        <LayoutGenerate backAction={backStep}>
            <Box>
                <Heading fontSize="2xl" textAlign={["center", "left"]}>
                    Choose App
                </Heading>
                <Box mt={10}>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <SimpleGrid columns={[1, 1, 2, 4]} spacing={[5, 10]}>
                            {apps.map((app) => (
                                <Box mx={"auto"} key={app.id}>
                                    {app.status ? (
                                        <Box
                                            color="white"
                                            cursor="pointer"
                                            position="relative"
                                            w="158px"
                                            h="64px"
                                            rounded="full"
                                            overflow="hidden"
                                            transition="ease-in-out .5s"
                                            bg={`linear-gradient(180deg, rgba(20, 19, 24, 0) 0%, rgba(20, 19, 24, 0.4) 100%), url(${app.thumbnail}) center no-repeat`}
                                            bgSize="contain"
                                            onClick={() =>
                                                app.status === "LAUNCH" &&
                                                onClick(app)
                                            }
                                            _hover={{
                                                _before: {
                                                    display:
                                                        app.status === "LAUNCH"
                                                            ? "none"
                                                            : "flex",
                                                },
                                                transform: "scale(1.1)",
                                            }}
                                            _before={{
                                                content: `"coming soon"`,
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                display: "none",
                                                w: "100%",
                                                h: "100%",
                                                fontSize: "sm",
                                                p: "10px",
                                                pt: "20px",
                                                background:
                                                    "rgba(20, 19, 24, 0.8)",
                                                backdropFilter: "blur(2px)",
                                            }}
                                            key={app.id}
                                        ></Box>
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
        </LayoutGenerate>
    );
};
