import {
    Box,
    BoxProps,
    CloseButton,
    Flex,
    FlexProps,
    Icon,
    Image,
} from "@chakra-ui/react";
import { IconType } from "react-icons";
import {
    FiCompass,
    FiHome,
    FiSettings,
    FiStar,
    FiTrendingUp,
} from "react-icons/fi";
interface LinkItemProps {
    name: string;
    icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
    { name: "Home", icon: FiHome },
    { name: "Generate", icon: FiTrendingUp },
    { name: "Explore", icon: FiCompass },
    { name: "Favourites", icon: FiStar },
    { name: "Settings", icon: FiSettings },
];
interface SidebarProps extends BoxProps {
    onClose: () => void;
}
export const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            bg="inherit"
            transition="3s ease"
            color="gray.500"
            // borderRight="1px"
            // borderRightColor={useColorModeValue("gray.200", "gray.700")}
            py={8}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                height="100px"
                alignItems="center"
                mx="10"
                justifyContent="space-between"
            >
                {/* <Text>CodeDoc.AI</Text> */}
                <Box mb={2} h="full">
                    <Image
                        objectFit="fill"
                        w="full"
                        h="full"
                        src="/codeDocAi.png"
                        alt="me"
                    />
                </Box>

                <CloseButton
                    display={{ base: "flex", md: "none" }}
                    onClick={onClose}
                />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: React.ReactNode;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
        <Box style={{ textDecoration: "none" }} _focus={{ boxShadow: "none" }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "#f7f3f2",
                    // color: "white",
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        // _groupHover={{
                        //     color: "white",
                        // }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Box>
    );
};
