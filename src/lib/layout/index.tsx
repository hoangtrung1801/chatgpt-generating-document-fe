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
            backgroundColor={"blackAlpha.100"}
            minHeight="100vh"
            padding={[
                "1.25rem 1rem",
                "1.25rem 2rem",
                "1.25rem 4rem",
                "1.25rem 6rem",
            ]}
        >
            <Box>
                {/* <Header /> */}
                {/* marginY={22} */}
                <Box>{children}</Box>
                {/* <Footer /> */}
            </Box>
        </Box>
    );
};

export default Layout;
