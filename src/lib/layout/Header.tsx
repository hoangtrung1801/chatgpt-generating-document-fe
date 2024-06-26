import {
    Avatar,
    Flex,
    Heading,
    HStack,
    IconProps,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Text,
} from "@chakra-ui/react";
import { logout } from "lib/api/auth";
import useCurrentUser from "lib/hooks/useCurrentUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookies, setCookie, deleteCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Loading from "components/Loading";
import { CustomToast } from "components/CustomToast";

const Header = () => {
    const { reload } = useRouter();
    const route = useRouter();
    const { currentUser, isLoading } = useCurrentUser();
    const [logoutSuccess, setLogoutSuccess] = useState(false);
    const { addToast } = CustomToast();

    const handleLogout = () => {
        deleteCookie("Authorization");
        addToast({ message: "logout successfully!", type: "success" });
        logout().then(() => {
            setLogoutSuccess(false);
            // route.push("/login");
            reload();
        });
    };

    useEffect(() => {
        console.log({ currentUser });
    }, [currentUser]);

    return (
        <Flex as="header" width="full" align="center">
            {logoutSuccess ? (
                <Loading />
            ) : (
                <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    w="100%"
                >
                    <Link href={"/"}>
                        <Heading size="xl">CodeDocAI</Heading>
                    </Link>

                    <Menu>
                        <MenuButton
                            as={Avatar}
                            cursor="pointer"
                            colorScheme="pink"
                            fontSize={"sm"}
                        />
                        <MenuList>
                            {!currentUser && (
                                <MenuGroup
                                    fontSize="20px"
                                    title={`You are not logged in`}
                                >
                                    <Link href={"/login"}>
                                        <MenuItem>Login</MenuItem>
                                    </Link>
                                    <Link href={"/signup"}>
                                        <MenuItem>Sign up</MenuItem>
                                    </Link>
                                </MenuGroup>
                            )}
                            {currentUser && (
                                <MenuGroup
                                    fontSize="20px"
                                    title={`Hi, ${
                                        currentUser && currentUser.name
                                    }`}
                                >
                                    <MenuItem onClick={handleLogout}>
                                        Log out
                                    </MenuItem>
                                </MenuGroup>
                            )}
                        </MenuList>
                    </Menu>
                </HStack>
            )}
        </Flex>
    );
};

export default Header;
