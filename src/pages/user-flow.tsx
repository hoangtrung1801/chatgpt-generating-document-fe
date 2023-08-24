import { Stack } from "@chakra-ui/react";
import { LayoutCreateProject } from "components/create-project/components/Layout";
import { mermaidRes } from "components/mermaid/data";
import dynamic from "next/dynamic";
const Mermaid = dynamic(() => import("components/mermaid"), {
    ssr: false,
});

type Props = {};

const UserFlow = (props: Props) => {
    return (
        <LayoutCreateProject>
            <Stack justify="center" zIndex={100} w="100vw">
                <Mermaid chart={mermaidRes} />
            </Stack>
        </LayoutCreateProject>
    );
};

export default UserFlow;
