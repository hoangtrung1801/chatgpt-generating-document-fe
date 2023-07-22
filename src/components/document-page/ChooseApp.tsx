import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
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
                                    <Box
                                        color="white"
                                        cursor="pointer"
                                        position="relative"
                                        w="158px"
                                        h="64px"
                                        rounded="full"
                                        overflow="hidden"
                                        transition="ease-in-out .5s"
                                        bg={`linear-gradient(180deg, rgba(20, 19, 24, 0) 0%, rgba(166, 165, 170 , 0.4) 100%), url(${app.thumbnail}) center no-repeat`}
                                        bgSize="contain"
                                        onClick={() =>
                                            app.status === "LAUNCH" &&
                                            onClick(app)
                                        }
                                        _hover={{
                                            _before: {
                                                display: "flex",
                                            },
                                            transform: "scale(1.1)",
                                        }}
                                        _before={{
                                            content: `${
                                                app.status === "LAUNCH"
                                                    ? `"${app.name}"`
                                                    : `"coming soon"`
                                            }`,
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
                                            background: `${
                                                app.status === "LAUNCH"
                                                    ? "rgba(20, 19, 24, 0.8)"
                                                    : "rgba(20, 19, 24, 0.8)"
                                            } `,
                                            backdropFilter: "blur(2px)",
                                        }}
                                        key={app.id}
                                    />
                                </Box>
                            ))}
                        </SimpleGrid>
                    )}
                </Box>
            </Box>
        </LayoutGenerate>
    );
};
