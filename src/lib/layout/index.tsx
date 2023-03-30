import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";
import Header from "./Header";

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <Box
            // margin="0 auto"
            // maxWidth={"container.xl"}
            transition="0.5s ease-out"
        >
            <Box>
                {/* <Header /> */}
                {/* marginY={22} */}
                <Box as="main">{children}</Box>
                {/* <Footer /> */}
            </Box>
        </Box>
    );
};

export default Layout;
