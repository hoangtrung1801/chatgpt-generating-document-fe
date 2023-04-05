import React, { useState } from "react";
import {
    AddIcon,
    AttachmentIcon,
    CalendarIcon,
    EmailIcon,
    HamburgerIcon,
} from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Icon,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";

const TabLeftTitle = [
    {
        content: "Documents",
        icon: HamburgerIcon,
    },
    {
        content: "Logo",
        icon: AddIcon,
    },
    {
        content: "SOP & Document",
        icon: CalendarIcon,
    },
    {
        content: "Assistant",
        icon: EmailIcon,
    },
    {
        content: "BLacklogs",
        icon: AttachmentIcon,
    },
];

function LeftDashBoardMobile({ isShow, setIsShow }: any) {
    const btnRef = React.useRef();
    const [isActive, setIsActive] = useState(0);
    const onClose = () => {
        setIsShow(false);
    };
    return (
        <Box>
            <Drawer
                colorScheme="blue"
                size="xs"
                isOpen={isShow}
                placement="left"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody bg="#090c10">
                        <Flex
                            h="100vh"
                            bg="#090c10"
                            color="white"
                            gap={5}
                            px={[0, 5]}
                            flexDir="column"
                        >
                            <VStack
                                rounded="md"
                                border="1px"
                                borderColor="white"
                                alignItems="flex-start"
                                gap={2}
                                display={["none", "block"]}
                                p={["0 0", "20px 20px"]}
                                mt="80px"
                            >
                                <Text fontSize={"xl"} fontWeight="bold">
                                    Welcome to CodeDocAI
                                </Text>
                            </VStack>
                            <Flex gap={3} flexDirection="column">
                                {TabLeftTitle.map((item, _index) => (
                                    <Box
                                        display="flex"
                                        gap="10px"
                                        alignItems="center"
                                        cursor="pointer"
                                        key={item.content}
                                        bg={
                                            isActive === _index
                                                ? "whiteAlpha.200"
                                                : "transparent"
                                        }
                                        _hover={{
                                            bg: "whiteAlpha.200",
                                        }}
                                        p={4}
                                        rounded="lg"
                                        onClick={() => setIsActive(_index)}
                                    >
                                        <Icon
                                            w="19px"
                                            h="19px"
                                            as={item.icon}
                                        />
                                        <Text>{item.content}</Text>
                                    </Box>
                                ))}
                            </Flex>
                        </Flex>
                    </DrawerBody>

                    {/* <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue">Save</Button>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>
        </Box>
    );
}

export default LeftDashBoardMobile;
