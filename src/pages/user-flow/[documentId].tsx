import { Button, HStack, Stack, useToast } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Mermaid = dynamic(() => import("components/mermaid"), {
    ssr: false,
});
import { LayoutCreateProject } from "components/create-project/components/Layout";
// import Mermaid from "components/mermaid";
import { mermaidRes } from "components/mermaid/data";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import generateDocument from "lib/api/generateDocument";
import useUserSelection from "lib/hooks/useSelection";
import { useGlobalLoading } from "stores/useGlobalLoading";
import useSwr, { SWRResponse } from "swr";
import { fetchWithCredentials } from "lib/fetcher";
import createUserFlow from "lib/api/createUserFlow";

type Props = {};
const end = "```";
const start = "```";
function isFormatMermaid(mermaidContent: string) {
    // if (!mermaidContent) return false;
    console.log("mermaidContent: ", mermaidContent);
    if (mermaidContent.toString().endsWith("```\n")) return true;
    else return false;
}

// function generateFlowchart(input: string) {
//     if (!input) return;

//     return input.replace(/```mermaid\n([\s\S]*?)```/, "$1");
// }

function generateFlowchart(input: string) {
    if (!input) return;
    const startIndex = input.indexOf(start);
    const endIndex = input.indexOf(end, startIndex + start.length);
    if (startIndex !== -1 && endIndex !== -1) {
        const extractedText = input.substring(
            startIndex + start.length,
            endIndex
        );
        return extractedText;
    }
}

const UserPlowPage = (props: Props) => {
    const router = useRouter();
    const toast = useToast();

    const selectionId = Number(router.query.documentId);
    const [ready, setReady] = useState(false);
    const toggleLoading = useGlobalLoading((state) => state.toggleLoading);
    const closeLoading = useGlobalLoading((state) => state.closeLoading);
    const { error, selection, isSelectionLoading, mutateSelection } =
        useUserSelection({
            params: selectionId,
            selectionId,
            enabled: ready,
        });

    // const { mutate } = useSwr(
    //     "user-flow",
    //     () => createUserFlow(selection.id)
    //     // fetchWithCredentials
    // );
    useEffect(() => {
        if (!router.isReady) return;
        setReady(router.isReady);
    }, [router.isReady]);

    // useEffect(() => {
    //     if (selection && selection.userFlow) {
    //         console.log("selection.userFlow: ", selection.userFlow);
    //         // console.log(
    //         //     "isFormatMermaid(selection.userFlow) ",
    //         //     isFormatMermaid(selection.userFlow)
    //         // );
    //         if (!isFormatMermaid(selection.userFlow)) {
    //             console.log("sai r ");
    //             toast({ description: "Error with format", status: "error" });
    //             mutate().then((value) => {
    //                 console.log("value: ", value);
    //                 mutateSelection(selection.id).then((value2) => {
    //                     console.log("value 2: ", value2);
    //                 });
    //             });
    //         }
    //         return;
    //     }
    //     return;
    // }, [selection]);

    const handleContinue = async () => {
        // API - Generate Document
        const response2 = await generateDocument(selectionId);
        const outline = response2.data;
        console.log({ outline });
        // addToast(response);
        router.push(`/documents-generate/${selectionId}`);
    };
    if (isSelectionLoading)
        return toggleLoading("Watting for get user flow...");

    if (!isSelectionLoading) {
        closeLoading();
        // console.log(
        //     generateFlowchart(selection.userFlow).replace(/mermaid\n/, "")
        // );
        // if (!isFormatMermaid(selection?.userFlow)) {
        //     toast({ description: "Error with format", status: "error" });
        //     mutate().then((value) => {
        //         console.log("value: ", value);
        //         // mutateSelection(selectionId);
        //     });
        // }

        return (
            <LayoutCreateProject page={"Home"}>
                <Stack align="center" justify="center" zIndex={100} w="100vw">
                    <Mermaid
                        chart={
                            selection && selectionId
                                ? generateFlowchart(selection.userFlow).replace(
                                      /mermaid\n/,
                                      ""
                                  )
                                : ""
                        }
                    />
                    <HStack>
                        <Button
                            onClick={handleContinue}
                            minW="200px"
                            variant="primary"
                        >
                            Continue
                        </Button>
                    </HStack>
                </Stack>
            </LayoutCreateProject>
        );
    }
};

export default UserPlowPage;
