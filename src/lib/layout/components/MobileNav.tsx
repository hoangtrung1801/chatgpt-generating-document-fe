import {
    Avatar,
    Box,
    Button,
    Flex,
    FlexProps,
    HStack,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { PlusIcon } from "icons";
import { AllDocumentsIcon } from "icons/all-documents";
import useCurrentUser from "lib/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { FiBell, FiChevronDown, FiMenu } from "react-icons/fi";
import { getCookies, setCookie, deleteCookie } from "cookies-next";
import { logout } from "lib/api/auth";
import { CustomToast } from "components/CustomToast";
interface MobileProps extends FlexProps {
    onOpen: () => void;
}
export const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    const router = useRouter();
    const { addToast } = CustomToast();
    const handleLogout = () => {
        deleteCookie("Authorization");
        addToast({ message: "logout successfully!", type: "success" });
        logout().then(() => {
            // setLogoutSuccess(false);
            // route.push("/login");
            router.reload();
        });
    };

    const {
        currentUser,
        isLoading: isCurrentUserLoading,
        error,
    } = useCurrentUser();
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            // py={4}
            height="100px"
            alignItems="center"
            bg="white"
            justifyContent={{ base: "space-between", md: "space-between" }}
            {...rest}
        >
            <Stack>
                <HStack>
                    <Icon color="black" as={AllDocumentsIcon} />
                    <Text color="black" fontWeight={700} fontSize="xl">
                        All documents
                    </Text>
                </HStack>
                <Flex>
                    <Button
                        onClick={() => router.push("/create-project")}
                        maxH="40px"
                        variant="primary"
                        leftIcon={<Icon as={PlusIcon} w="24px" h="24px" />}
                    >
                        Create document
                    </Button>
                </Flex>
            </Stack>
            <IconButton
                display={{ base: "flex", md: "none" }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: "flex", md: "none" }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Logo
            </Text>

            <HStack spacing={{ base: "0", md: "6" }}>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell />}
                />
                <Flex alignItems={"center"}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: "none" }}
                        >
                            <VStack>
                                <Avatar size={"sm"} />
                                <VStack
                                    display={{ base: "none", md: "flex" }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="xs" color="gray.600">
                                        {currentUser?.name}
                                    </Text>
                                </VStack>
                                <Box display={{ base: "none", md: "flex" }}>
                                    <FiChevronDown />
                                </Box>
                            </VStack>
                        </MenuButton>
                        <MenuList p={2} color="black" bg="white">
                            <MenuItem bg="white">{`Hi, ${currentUser?.name}`}</MenuItem>
                            <MenuDivider bg="black" />
                            <MenuItem onClick={() => handleLogout()} bg="white">
                                Sign out
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
