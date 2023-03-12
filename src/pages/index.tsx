import { Flex } from "@chakra-ui/react";
import CTASection from "components/samples/CTASection";
import SomeImage from "components/samples/SomeImage";
import SomeText from "components/samples/SomeText";
import { NextPage } from "next";

const Home: NextPage = () => {
    return (
        <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            minHeight="70vh"
            gap={4}
            mb={8}
            w="full"
        >
            <SomeText />
            <SomeImage />
            <CTASection />
        </Flex>
    );
};

export default Home;
