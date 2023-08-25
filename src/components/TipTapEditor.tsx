import React, { useCallback, useState } from "react";
import { Box, HStack, Icon, Button, Stack } from "@chakra-ui/react";
import * as Icons from "svgs/icons";
// => Tiptap packages
import {
    useEditor,
    EditorContent,
    Editor,
    BubbleMenu,
    Content,
} from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Code from "@tiptap/extension-code";
import History from "@tiptap/extension-history";
import { CustomBlockExtension } from "./extension";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
// Custom

type TipTapEditorProps = {
    content: string;
};

export default function TipTapEditor({ content }: TipTapEditorProps) {
    const [contentState, setContentState] = useState<string>(content);
    const editor = useEditor({
        extensions: [
            Document,
            History,
            Paragraph,
            Text,
            Bold,
            Italic,
            Strike,
            Code,
            ListItem,
            BulletList,
            OrderedList,
            CustomBlockExtension,
            Heading.configure({
                levels: [1, 2, 3, 4, 5, 6],
            }),
        ],
        content: contentState,
    }) as Editor;

    const toggleUnderline = useCallback(() => {
        // editor.chain().focus().toggleUnderline().run();
    }, [editor]);
    const toggleBold = useCallback(() => {
        editor.chain().focus().toggleBold().run();
    }, [editor]);

    const toggleItalic = useCallback(() => {
        editor.chain().focus().toggleItalic().run();
    }, [editor]);

    const toggleStrike = useCallback(() => {
        editor.chain().focus().toggleStrike().run();
    }, [editor]);

    const toggleCode = useCallback(() => {
        editor.chain().focus().toggleCode().run();
    }, [editor]);

    if (!editor) {
        return null;
    }

    return (
        <Stack spacing={6}>
            <Stack
                w="fit-content"
                borderWidth={"1px"}
                borderColor="#c7cdd4"
                zIndex={2}
                bg="white"
                color="black"
            >
                <Box>
                    <HStack p="10px" borderBottom="1px" borderColor="#edf1f6">
                        <Button
                            h="36px"
                            p={0}
                            onClick={() => editor.chain().focus().undo().run()}
                            isDisabled={!editor.can().undo()}
                        >
                            <Icons.RotateLeft />
                        </Button>
                        <Button
                            h="36px"
                            p={0}
                            onClick={() => editor.chain().focus().redo().run()}
                            isDisabled={!editor.can().redo()}
                        >
                            <Icons.RotateRight />
                        </Button>

                        <Button
                            h="36px"
                            variant="secondary_2"
                            isActive={editor.isActive("bold")}
                            onClick={toggleBold}
                        >
                            <Icons.Bold />
                        </Button>
                        <Button
                            h="36px"
                            variant="secondary_2"
                            isActive={editor.isActive("underline")}
                            onClick={toggleUnderline}
                        >
                            <Icons.Underline />
                        </Button>
                        <Button
                            variant="secondary_2"
                            h="36px"
                            isActive={editor.isActive("intalic")}
                            onClick={toggleItalic}
                        >
                            <Icons.Italic />
                        </Button>
                        <Button
                            variant="secondary_2"
                            h="36px"
                            isActive={editor.isActive("strike")}
                            onClick={toggleStrike}
                        >
                            <Icons.Strikethrough />
                        </Button>
                        <Button
                            variant="secondary_2"
                            h="36px"
                            isActive={editor.isActive("code")}
                            onClick={toggleCode}
                        >
                            <Icons.Code />
                        </Button>
                    </HStack>

                    <EditorContent
                        onChange={(e) => console.log(e)}
                        style={{
                            maxWidth: "900px",
                            maxHeight: "500px",
                            overflow: "auto",
                            padding: "10px",
                        }}
                        editor={editor}
                    />
                </Box>
            </Stack>
            <HStack justify="center">
                <Button variant="outline">Export</Button>
                <Button
                    onClick={() => console.log(editor.getText())}
                    variant="primary"
                >
                    Save Changes
                </Button>
            </HStack>
        </Stack>
    );
}
