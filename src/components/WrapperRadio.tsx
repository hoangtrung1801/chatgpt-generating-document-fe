import { Center } from "@chakra-ui/react";

const WrapperRadio = ({ children, ...rest }: any) => {
    return (
        <Center
            // w={48}
            // h={12}
            minW={300}
            transition="ease-in-out .5s"
            fontWeight="medium"
            border="1px"
            _hover={{ bg: "blue.100" }}
            borderRadius={20}
            cursor="pointer"
            {...rest}
        >
            {children}
        </Center>
    );
};

export default WrapperRadio;
