import { ArrowIcon } from "icons";
import { Flex, FlexProps, Icon } from "@chakra-ui/react";

interface IBackToProps extends FlexProps {
    action: () => void;
}
export const BackTo = ({ action, children, ...rest }: IBackToProps) => {
    return (
        <Flex
            align="center"
            gap="10px"
            cursor="pointer"
            onClick={action}
            color="text.400"
            {...rest}
        >
            <Icon
                as={ArrowIcon}
                w="20px"
                h="20px"
                transform="rotate(180deg)"
                color="black"
            />
            {children}
        </Flex>
    );
};
