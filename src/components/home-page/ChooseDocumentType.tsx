import { Center, Flex, Heading, Text } from "@chakra-ui/react";

const ChooseDocumentType = ({ setDocumentType }: any) => {
    return (
        <Flex direction={"column"} alignItems="center" textAlign={"center"}>
            <Heading>Which kind of document do you want to generate?</Heading>
            <Center
                w={400}
                h={400}
                mt={4}
                borderRadius="1rem"
                bg="blackAlpha.900"
                _hover={{
                    bg: "blackAlpha.800",
                }}
                color={"white"}
                cursor="pointer"
                onClick={() => setDocumentType("app")}
            >
                <Text>Like existing app</Text>
            </Center>
        </Flex>
    );
};

export default ChooseDocumentType;
