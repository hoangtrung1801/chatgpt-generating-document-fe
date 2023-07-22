import {
    Box, Flex,
    Heading, Image,
    Stack,
    Text
} from "@chakra-ui/react";
import { useState } from "react";

export const ChooseDocumentType = ({ setDocumentType, setOutStep }: any) => {
    const [isHoverExsistApp, setIsHoverExsistApp] = useState(false);
    const [isHoverNewApp, setIsHoverNewApp] = useState(false);
    return (
        <Flex
            direction={"column"}
            gap={4}
            alignItems="center"
            textAlign={"center"}
        >
            <Heading>Which kind of app do you want to build?</Heading>
            <Stack
                flexDir={["column", "column", "column", "row"]}
                mt={4}
                gap={16}
            >
                <Flex
                    overflow="hidden"
                    flexDirection="column"
                    w={[400]}
                    h={[400]}
                    borderRadius="1rem"
                    alignItems="center"
                    pt="40px"
                    bg="#202020"
                    _hover={{
                        bg: "black",
                    }}
                    onMouseOver={() => setIsHoverExsistApp(true)}
                    onMouseLeave={() => setIsHoverExsistApp(false)}
                    color={"white"}
                    cursor="pointer"
                    onClick={() => {
                        setDocumentType("app");
                        setOutStep(2);
                    }}
                >
                    <Text mb="4px" fontSize="20px" fontWeight="bold">
                        Like existing Apps
                    </Text>
                    <Text>Uber, Instagram, Airbnb, Whatsapp etc.</Text>
                    <Image
                        transition="ease-in-out .5s"
                        transform={isHoverExsistApp ? "scale(1.1)" : ""}
                        mt="auto"
                        alt="app"
                        src="https://i.ibb.co/FXbkbm0/calc-category-001.png"
                    />
                </Flex>
                <Flex
                    mt={"0px !important"}
                    position="relative"
                    overflow="hidden"
                    flexDirection="column"
                    w={400}
                    h={400}
                    borderRadius="1rem"
                    alignItems="center"
                    pt="40px"
                    bg="blue.500"
                    _hover={{
                        bg: "blue.600",
                    }}
                    onMouseOver={() => setIsHoverNewApp(true)}
                    onMouseLeave={() => setIsHoverNewApp(false)}
                    color={"white"}
                    cursor="pointer"
                    // onClick={() => {
                    //     setDocumentType("app");
                    //     setOutStep(2);
                    // }}
                >
                    <Text mb="4px" fontSize="20px" fontWeight="bold">
                        Design new App
                    </Text>
                    <Text>Create new app of your choice.</Text>
                    <Image
                        transition="ease-in-out .5s"
                        transform={isHoverNewApp ? "scale(1.1)" : ""}
                        mt="auto"
                        alt="app"
                        src="https://i.ibb.co/YWx2TWh/calc-category-2.png"
                    />
                    <Box
                        position="absolute"
                        borderRadius="1rem"
                        top="0"
                        right="0"
                        left="0"
                        bottom="0"
                        bg="rgba(0,0,0,.8)"
                        opacity={isHoverNewApp ? 1 : 0}
                        transition="ease-in-out .5s"
                    ></Box>
                    <Box
                        position="absolute"
                        color="white"
                        fontSize="17px"
                        textTransform="capitalize"
                        top="50%"
                        left="0"
                        right="0"
                        textAlign="center"
                        opacity={isHoverNewApp ? 1 : 0}
                        transition="ease-in-out .5s"
                    >
                        Comming soon!
                    </Box>
                </Flex>
            </Stack>
        </Flex>
    );
};
