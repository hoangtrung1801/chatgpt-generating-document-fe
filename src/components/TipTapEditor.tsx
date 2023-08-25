import { Box, Button, HStack, Stack, useToast } from "@chakra-ui/react";
import { useState } from "react";
// => Tiptap packages
import Heading from "@tiptap/extension-heading";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "tiptap/Toolbar";
import { CustomBlockExtension } from "./extension";
import { updateDocument } from "lib/api/document";
import TurndownService from "turndown";
const md = require("markdown-it")();
const turndownService = new TurndownService();
// Custom

type TipTapEditorProps = {
    content?: string;
    document_id?: number;
    selection: any;
};

export default function TipTapEditor({ selection }: TipTapEditorProps) {
    const toast = useToast();
    const [contentState, setContentState] = useState<string>(
        md.render(selection ? selection?.document : "")
    );
    const editor = useEditor({
        extensions: [
            StarterKit,
            CustomBlockExtension,
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
        ],
        content: contentState,
    }) as Editor;

    if (!editor) {
        return null;
    }
    const handleSaveChange = async (HTMLContent: string) => {
        try {
            const res = await updateDocument({
                selectionId: selection.id,
                payload: {
                    document: turndownService.turndown(HTMLContent),
                },
            });
            toast({ description: res.message, status: "success" });
        } catch (error) {
            toast({ description: error, status: "error" });
        }
    };

    return (
        <Stack spacing={6}>
            <Stack
                borderWidth={"1px"}
                borderColor="#c7cdd4"
                zIndex={2}
                bg="white"
                color="black"
                borderRadius="xl"
            >
                <Box>
                    <Toolbar onSave={handleSaveChange} editor={editor} />

                    <EditorContent
                        style={{
                            width: "100%",
                            maxHeight: "80vh",
                            minHeight: "80vh",
                            overflow: "auto",
                            padding: "20px 50px",
                        }}
                        editor={editor}
                    />
                </Box>
            </Stack>
            {/* <HStack justify="center">
                <Button variant="outline">Export Document</Button>
                <Button
                    onClick={() => {
                        handleSaveChange(editor.getHTML());
                    }}
                    variant="primary"
                >
                    Save Changes
                </Button>
            </HStack> */}
        </Stack>
    );
}
