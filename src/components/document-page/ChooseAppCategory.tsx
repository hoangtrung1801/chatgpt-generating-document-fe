import { Box, Heading, Image, SimpleGrid } from "@chakra-ui/react";
import Loading from "components/Loading";
import useCategories from "lib/hooks/useGetCategories";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import useConfirmStore from "stores/useCofirmOptions";
import useSelectionStore from "stores/useSelectionStore";

const ChooseAppCategory = ({ nextStep }) => {
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
        <Box>
            <Heading textAlign={["center", "left"]}>Choose Categories</Heading>
            <Box mt={10}>
                {isLoading ? (
                    <Loading />
                ) : (
                    <SimpleGrid columns={[1, 1, 2, 4]} spacing={[5, 10]}>
                        {categories.map((category: any) => (
                            <Box mx={"auto"} key={category.id}>
                                {category.status ? (
                                    <Box
                                        rounded="full"
                                        w="240px"
                                        h="60px"
                                        overflow="hidden"
                                        transition="ease-in-out .5s"
                                        onClick={() => onClick(category)}
                                        _hover={{
                                            transform: "scale(1.1)",
                                        }}
                                        key={category.id}
                                    >
                                        <Image
                                            objectFit="fill"
                                            w="full"
                                            h="full"
                                            cursor="pointer"
                                            alt={category.name}
                                            src={category.thumbnail}
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
    );
};

export default ChooseAppCategory;
