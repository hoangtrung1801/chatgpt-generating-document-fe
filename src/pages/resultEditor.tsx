import dynamic from "next/dynamic";
import { NextPage } from "next";
import { Box } from "@chakra-ui/react";
const ResultEditor = dynamic(import("../result/index"), { ssr: false });

const ResultEditorPage = () => {
    return (
        <Box
            margin="50px auto"
            maxWidth={"container.xl"}
            transition="0.5s ease-out"
            minHeight="70vh"
            w="full"
            p={8}
        >
            <ResultEditor />
        </Box>
    );
};
export default ResultEditorPage;
