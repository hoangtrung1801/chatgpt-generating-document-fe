import {
    Box,
    Stack,
    Heading,
    Text,
    Container,
    Input,
    Button,
    SimpleGrid,
    useBreakpointValue,
    IconProps,
    Icon,
    Image,
    Textarea,
} from "@chakra-ui/react";
import CustomButton from "components/common/CustomButton";
import React from "react";
import { useFormContext } from "react-hook-form";

function TypeShortDescriptionApp({ nextStep }: any) {
    const { register } = useFormContext();

    return (
        <Box position={"relative"}>
            <Container
                as={SimpleGrid}
                maxW={"7xl"}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 14, lg: 18 }}
            >
                <Stack
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    spacing={8}
                    // spacing={{ base: 10, md: 20 }}
                >
                    <Heading
                        w="full"
                        textAlign="center"
                        py={10}
                        lineHeight={1.1}
                        fontSize={{
                            base: "3xl",
                            sm: "4xl",
                            md: "5xl",
                            lg: "6xl",
                        }}
                    >
                        CodeDocAI & Best choice for you!
                    </Heading>
                    <Stack
                        w="full"
                        direction={"row"}
                        align={"center"}
                        justifyContent="center"
                    >
                        <Image
                            w="200px"
                            height="200px"
                            src="/codeDocAi.png"
                            alt="me"
                        />
                    </Stack>
                </Stack>
                <Stack
                    rounded={"xl"}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: "lg" }}
                    border={"1px"}
                    borderColor="blackAlpha.400"
                >
                    <Stack spacing={4}>
                        <Heading
                            lineHeight={1.1}
                            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                        >
                            What do you want to build?
                        </Heading>
                        <Text
                            color={"blackAlpha.700"}
                            fontSize={{ base: "sm", sm: "md" }}
                        >
                            Please enter the app name and a detailed description
                            of it so we can generate results!
                        </Text>
                    </Stack>
                    <Box as={"form"} mt={10}>
                        <Stack spacing={10}>
                            <Input
                                placeholder="Name"
                                _placeholder={{
                                    color: "blackAlpha.700",
                                }}
                                borderColor="blackAlpha.600"
                                colorScheme="blackAlpha"
                                {...register("projectName")}
                            />
                            <Textarea
                                minH={200}
                                placeholder="Description"
                                _placeholder={{
                                    color: "blackAlpha.700",
                                }}
                                borderColor="blackAlpha.600"
                                colorScheme="blackAlpha"
                                {...register("description")}
                            />
                        </Stack>
                        <CustomButton
                            onClick={() => nextStep()}
                            mt={8}
                            w={"full"}
                        >
                            Submit
                        </CustomButton>
                    </Box>
                    form
                </Stack>
            </Container>
        </Box>
    );
}

export default TypeShortDescriptionApp;
