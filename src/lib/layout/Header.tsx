import {
    Avatar,
    Box,
    Flex,
    HStack,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";

import ThemeToggle from "./ThemeToggle";

const Header = () => {
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
                    ></MenuButton>
                    <MenuList>
                        <MenuGroup fontSize="20px" title="Profile">
                            <MenuItem>My Account</MenuItem>
                            <MenuItem>Log out </MenuItem>
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
