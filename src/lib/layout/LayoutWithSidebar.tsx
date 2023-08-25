"use client";

import {
    Box,
    Drawer,
    DrawerContent,
    FlexProps,
    useDisclosure,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { MobileNav, SidebarContent } from "./components";

interface MobileProps extends FlexProps {
    onOpen: () => void;
}

type LayoutWithSidebarProps = {
    children: ReactElement;
};
const LayoutWithSidebar = ({ children }: LayoutWithSidebarProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh" bg="white">
            <SidebarContent
                onClose={() => onClose}
                display={{ base: "none", md: "block" }}
            />
            <Drawer
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box bg="#f7f3f2" ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
};

export default LayoutWithSidebar;
