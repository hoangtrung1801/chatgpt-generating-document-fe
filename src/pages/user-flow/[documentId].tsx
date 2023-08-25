import { Button, HStack, Stack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Mermaid = dynamic(() => import("components/mermaid"), {
    ssr: false,
});
import { LayoutCreateProject } from "components/create-project/components/Layout";
// import Mermaid from "components/mermaid";
import { mermaidRes } from "components/mermaid/data";
import React from "react";
import { useRouter } from "next/router";

type Props = {};

const UserPlowPage = (props: Props) => {
    const router = useRouter();
    const selectionId = Number(router.query.documentId);
    return (
        <LayoutCreateProject page={"Home"}>
            <Stack align="center" justify="center" zIndex={100} w="100vw">
                <Mermaid chart={mermaidRes} />
                <HStack>
                    <Button
                        onClick={() =>
                            router.push(`/documents-generate/${selectionId}`)
                        }
                        minW="200px"
                        variant="primary"
                    >
                        Continue
                    </Button>
                </HStack>
            </Stack>
        </LayoutCreateProject>
    );
};

export default UserPlowPage;
