import { BlockNoteEditor, Block } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import "@milkdown/theme-nord/style.css";
import useCurrentUser from "lib/hooks/useCurrentUser";
import useSelection from "lib/hooks/useSelection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import "@blocknote/core/style.css";
import CustomButton from "components/common/CustomButton";

const markdown = `# Milkdown Next Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **Next**.`;

export default function DocumentPage() {
    const router = useRouter();
    const selectionId = Number(router.query.documentId);

    const { currentUser } = useCurrentUser();
    const { selection, isSelectionLoading, mutateSelection } =
        useSelection(selectionId);

    const [isClient, setIsClient] = useState(false);
    const editor: BlockNoteEditor | null = useBlockNote({
        theme: "light",
        editable: false,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (!selection?.document) {
                mutateSelection();
            }
        }, 1000 * 10);

        return () => clearInterval(interval);
    }, [mutateSelection, selection?.document]);

    useEffect(() => {
        console.log({ currentUser, selection });
    }, [currentUser, selection]);

    useEffect(() => setIsClient(true), []);

    useEffect(() => {
        if (editor) {
            // Whenever the current Markdown content changes, converts it to an array
            // of Block objects and replaces the editor's content with them.
            const getBlocks = async () => {
                // @ts-ignore
                const blocks: Block[] = await editor.markdownToBlocks(
                    selection?.document
                );
                editor.replaceBlocks(editor.topLevelBlocks, blocks);
            };
            getBlocks();
        }
    }, [editor, selection?.document]);

    return (
        <Stack className="bg-slate-50" spacing={4}>
            <Box>
                <Heading
                    as="h2"
                    size={"md"}
                    fontWeight="normal"
                    color="blackAlpha.700"
                >
                    Software Requirements Document for
                </Heading>
                <Heading size="2xl">{selection?.projectName}</Heading>
            </Box>
            <Box>
                <Text color="blackAlpha.600">
                    Created by {currentUser?.name}
                </Text>
            </Box>

            <Box
                __css={{
                    "& .ProseMirror": {
                        paddingY: "2rem",
                    },
                }}
            >
                {isSelectionLoading || !selection?.document || !isClient ? (
                    "Loading..."
                ) : (
                    <BlockNoteView editor={editor} />
                )}
            </Box>
            <Stack direction="row">
                <CustomButton onClick={() => (editor.isEditable = true)}>
                    Edit
                </CustomButton>
                <CustomButton>Save</CustomButton>
            </Stack>
        </Stack>
    );
}
