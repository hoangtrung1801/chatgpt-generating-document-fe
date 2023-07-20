import { Box, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import Loading from "components/Loading";
import useCategories from "lib/hooks/useGetCategories";
import { useFormContext } from "react-hook-form";
import useSelectionStore from "stores/useSelectionStore";
import { LayoutGenerate } from "./components";

type TChooseAppCategory = {
    nextStep: () => void;
    backStep: () => void;
};

export const ChooseAppCategory = ({
    nextStep,
    backStep,
}: TChooseAppCategory) => {
    const { setValue } = useFormContext();

    const setCategory = useSelectionStore((state) => state.setCategory);

    const { categories, isLoading } = useCategories();

    const onClick = (category: any) => {
        console.log({ category });
        // clearOptions();
        setValue("category", category.id);
        nextStep();
    };

    return (
        <LayoutGenerate backAction={backStep}>
            <Box>
                <Heading fontSize="2xl" textAlign={["center", "left"]}>
                    Choose Categories
                </Heading>
                <Box mt={10}>
                    {isLoading ? (
                        <Loading />
                    ) : (
                        <SimpleGrid columns={[1, 1, 2, 4]} spacing={[5, 10]}>
                            {categories.map((category: any) => (
                                <Box mx={"auto"} key={category.id}>
                                    <Box
                                        color="white"
                                        cursor="pointer"
                                        position="relative"
                                        w="158px"
                                        h="64px"
                                        rounded="full"
                                        overflow="hidden"
                                        transition="ease-in-out .5s"
                                        bg={`linear-gradient(180deg, rgba(20, 19, 24, 0) 0%, rgba(20, 19, 24, 0.4) 100%), url(${category.thumbnail}) center no-repeat`}
                                        bgSize="contain"
                                        onClick={() =>
                                            category.status === "LAUNCH" &&
                                            onClick(category)
                                        }
                                        _hover={{
                                            _before: {
                                                display: "flex",
                                            },
                                            transform: "scale(1.1)",
                                        }}
                                        _before={{
                                            content: `${
                                                category.status === "LAUNCH"
                                                    ? `"${category.name}"`
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
                                                category.status === "LAUNCH"
                                                    ? "rgba(20, 19, 24, 0.8)/20"
                                                    : "rgba(20, 19, 24, 0.8)"
                                            } `,
                                            backdropFilter: "blur(2px)",
                                        }}
                                        key={category.id}
                                    ></Box>
                                </Box>
                            ))}
                        </SimpleGrid>
                    )}
                </Box>
            </Box>
        </LayoutGenerate>
    );
};
