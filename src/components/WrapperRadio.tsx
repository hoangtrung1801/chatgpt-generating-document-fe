import { Center } from "@chakra-ui/react";

const WrapperRadio = ({ children, ...rest }: any) => {
    return (
        <Center
            w={48}
            h={12}
            border="1px"
            borderRadius={12}
            cursor="pointer"
            {...rest}
        >
            {children}
        </Center>
    );
};

export default WrapperRadio;
