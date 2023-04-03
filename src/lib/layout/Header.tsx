import {
    Avatar,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import { logout } from "lib/api/auth";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
    const { reload } = useRouter();

    const handleLogout = () => {
        logout().then(() => {
            reload();
        });
    };

    return (
        <Flex as="header" width="full" align="center">
            <HStack justifyContent="space-between" w="100%">
                <Text fontWeight="bold" fontSize="40px">
                    Welcome to CodeDocAI
                </Text>
                <Menu>
                    <MenuButton
                        as={Avatar}
                        cursor="pointer"
                        colorScheme="pink"
                    />
                    <MenuList>
                        <MenuGroup fontSize="20px" title="Profile">
                            <MenuItem as={Link} href="/result">
                                Personal
                            </MenuItem>
                            <MenuItem onClick={handleLogout}>My page</MenuItem>
                        </MenuGroup>
                    </MenuList>
                </Menu>
            </HStack>

            {/* <Box marginLeft="auto">
                <ThemeToggle />
            </Box> */}
        </Flex>
    );
};

export default Header;
