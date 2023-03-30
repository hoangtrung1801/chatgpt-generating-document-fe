import { Center, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";

const ChooseDocumentType = ({ setDocumentType, setOutStep }: any) => {
    return (
        <Flex direction={"column"} gap={4} alignItems="center" textAlign={"center"}>
            <Heading>Which kind of app do you want to build?</Heading>
            <HStack mt={4} gap={16}>
                <Center
                    w={400}
                    h={400}
                    borderRadius="1rem"
                    bg="blackAlpha.900"
                    _hover={{
                        bg: "blackAlpha.800",
                    }}
                    color={"white"}
                    cursor="pointer"
                    onClick={() => {
                        setDocumentType("app");
                        setOutStep(2);
                    }}
                >
                    <Text>Like existing app</Text>
                </Center>
                <Center
                    w={400}
                    h={400}
                    borderRadius="1rem"
                    bg="blackAlpha.900"
                    _hover={{
                        bg: "blackAlpha.800",
                    }}
                    color={"white"}
                    cursor="pointer"
                    onClick={() => {}}
                >
                    <Text>New app</Text>
                </Center>
            </HStack>
        </Flex>
    );
};

export default ChooseDocumentType;
