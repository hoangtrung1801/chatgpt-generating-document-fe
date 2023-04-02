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

export default function JoinOurTeam() {
    return (
        <Box position={"relative"}>
            <Container
                as={SimpleGrid}
                maxW={"7xl"}
                columns={{ base: 1, md: 2 }}
                // spacing={{ base: 10, lg: 32 }}
                // py={{ base: 10, sm: 20, lg: 32 }}
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
                        CodeDocAI{" "}
                        <Text
                            as={"span"}
                            bgGradient="linear(to-r, blue.400,blue.800)"
                            bgClip="text"
                        >
                            &
                        </Text>{" "}
                        Best choice for you!
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
                    bg={"gray.50"}
                    rounded={"xl"}
                    p={{ base: 4, sm: 6, md: 8 }}
                    spacing={{ base: 8 }}
                    maxW={{ lg: "lg" }}
                >
                    <Stack spacing={4}>
                        <Heading
                            color={"gray.800"}
                            lineHeight={1.1}
                            fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                        >
                            What do you want to build?
                        </Heading>
                        <Text
                            color={"gray.500"}
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
                                bg={"gray.100"}
                                border={0}
                                color={"gray.500"}
                                _placeholder={{
                                    color: "gray.500",
                                }}
                            />
                            <Textarea
                                minH={200}
                                placeholder="Description"
                                bg={"gray.100"}
                                border={0}
                                color={"gray.500"}
                                _placeholder={{
                                    color: "gray.500",
                                }}
                            />
                        </Stack>
                        <Button
                            mt={8}
                            w={"full"}
                            bgGradient="linear(to-r, blue.400,blue.200)"
                            color={"white"}
                            _hover={{
                                boxShadow: "xl",
                            }}
                        >
                            Submit
                        </Button>
                    </Box>
                    form
                </Stack>
            </Container>
            <Blur
                position={"absolute"}
                top={0}
                left={0}
                style={{ filter: "blur(70px)" }}
            />
        </Box>
    );
}

export const Blur = (props: IconProps) => {
    return (
        <Icon
            width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
            zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
            height="560px"
            viewBox="0 0 528 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            {/* <circle cx="71" cy="61" r="111" fill="#F56565" />
            <circle cx="244" cy="106" r="139" fill="#ED64A6" />
            <circle cy="291" r="139" fill="#ED64A6" />
            <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
            <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
            <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" /> */}
            <circle cx="71" cy="61" r="111" fill="#4299E1" />
            {/* <circle cx="244" cy="106" r="139" fill="#4299E1" /> */}
            <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
        </Icon>
    );
};
