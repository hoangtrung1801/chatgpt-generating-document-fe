import React from "react";
import dynamic from "next/dynamic";
import { Box } from "@chakra-ui/react";
import {} from "@milkdown/react";

const Diagram = dynamic(() => import("../components/MilkdownEditorWrapper"), {
    ssr: false,
});

const MilkdownEditor = dynamic(() => import("../components/MilkdownWrapper"), {
    ssr: false,
});

type Props = {};

const testMilkdown = (props: Props) => {
    return (
        <Box>
            <MilkdownEditor />
        </Box>
    );
};

export default testMilkdown;
