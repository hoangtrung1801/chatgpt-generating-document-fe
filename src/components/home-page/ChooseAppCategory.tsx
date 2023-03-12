import { Box, Center, Grid, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import useCategories from "lib/hooks/useGetCategories";
import { useFormContext } from "react-hook-form";
import useSelectionStore from "stores/useSelectionStore";

// const categories = [
//     "Uber",
//     "Tinder",
//     "Facebook",
//     "airbnb",
//     "Whatsapp",
//     "Spotify",
//     "Netflix",
//     "Shopee",
// ];

const ChooseAppCategory = ({ nextStep }: any) => {
    const { register, getValues, setValue } = useFormContext();

    const setCategory = useSelectionStore((state) => state.setCategory);

    const { categories } = useCategories();

    const onClick = (category: any) => {
        setCategory(category.id);
        setValue("category", category);

        nextStep();
    };

    return (
        <Box>
            <Heading>Choose application</Heading>
            <Box mt={4}>
                <SimpleGrid columns={3} spacing={4}>
                    {categories.map((category: any) => (
                        <Center
                            key={category}
                            w="100%"
                            h={12}
                            bg="blackAlpha.300"
                            borderRadius={12}
                            cursor="pointer"
                            _hover={{
                                bg: "blackAlpha.400",
                            }}
                            onClick={() => onClick(category)}
                        >
                            <Text>{category.name}</Text>
                        </Center>
                    ))}
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default ChooseAppCategory;
