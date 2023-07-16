import { Box, Button } from "@chakra-ui/react";
import { defaultValueCtx, Editor, rootCtx } from "@milkdown/core";
import { commonmark } from "@milkdown/preset-commonmark";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { nord } from "@milkdown/theme-nord";
import useSelection from "lib/hooks/useSelection";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import "@milkdown/theme-nord/style.css";

const MilkdownEditor = ({ document = "" }) => {
    const editor = useEditor((root) =>
        Editor.make()
            .config(nord)
            .config((ctx) => {
                ctx.set(rootCtx, root);
                ctx.set(defaultValueCtx, document);
            })
            .use(commonmark)
    );

    return <Milkdown />;
};

export default function DocumentPage() {
    const router = useRouter();
    const selectionId = Number(router.query.documentId);

    const { selection, isSelectionLoading, mutateSelection } =
        useSelection(selectionId);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!selection?.document) {
                mutateSelection();
            }
        }, 1000 * 10);

        return () => clearInterval(interval);
    }, [mutateSelection, selection?.document]);

    return (
        <Box
            __css={{
                "& .milkdown": {
                    backgroundColor: "slate",
                    paddingX: "2rem",
                    paddingY: "1rem",
                    margin: "1.25rem",
                    border: "1px solid #000",
                },
                "& .editor": {
                    marginX: "auto",
                },
            }}
        >
            <MilkdownProvider>
                {isSelectionLoading || !selection?.document ? (
                    "Loading..."
                ) : (
                    <MilkdownEditor document={selection?.document} />
                )}
            </MilkdownProvider>

            <Button variant={"solid"} colorScheme="facebook">
                Save
            </Button>
        </Box>
    );
}
