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
                                    {category.status ? (
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
                                                    display:
                                                        category.status ===
                                                        "LAUNCH"
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
                                            key={category.id}
                                        >
                                            {/* <Image
                                            objectFit="contain"
                                            w="full"
                                            h="full"
                                            cursor="pointer"
                                            alt={category.name}
                                            src={category.thumbnail}
                                        /> */}
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
                                            key={category.id}
                                        >
                                            <Image
                                                w="full"
                                                h="full"
                                                cursor="pointer"
                                                alt={category.name}
                                                src={category.thumbnail}
                                            />
                                            <Box
                                                position="absolute"
                                                borderRadius="33px"
                                                top="0"
                                                right="0"
                                                left="0"
                                                bottom="0"
                                                bg="rgba(0,0,0,.8)"
                                                transition="ease-in-out .5s"
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
