import { Box, Button, HStack, Stack } from "@chakra-ui/react";
import React, { useCallback } from "react";
import * as Icons from "svgs/icons";
// => Tiptap packages
import Bold from "@tiptap/extension-bold";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import History from "@tiptap/extension-history";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
import Text from "@tiptap/extension-text";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import socketIOClient, { Socket } from "socket.io-client";
import { CustomBlockExtension } from "./extension";

const host = "http://localhost:3000";
// Custom

type TipTapEditorWithSocketProps = {
    content?: string;
};

export default function TipTapEditorWithSocket({}: TipTapEditorWithSocketProps) {
    const socketRef = React.useRef(null);

    const [text, setText] = React.useState("");
    const [content, setContent] = React.useState("");
    const [textPart, setTextPart] = React.useState("");
    const [number, setNumber] = React.useState(1);
    // const [loadingMermaid, setIsLoadingMermaid] = React.useState(false);

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
        // content: text,
    }) as Editor;

    const onGenerateDocument = () => {
        const socket: Socket = socketRef.current;

        let data = text;
        const getStreamDocument = (str) => {
            data += str;
            setText(data);
        };

        socket.on("get-generate-document-part", getStreamDocument);

        console.info(`GENERATE PART ${number}`);
        socket.emit(
            "generate-document-part",
            {
                selectionId: 226,
                partIndex: number,
            },
            (data) => {
                // xong
                // setnUmber
                console.log("data", data);
                setNumber((prevNumber) => prevNumber + 1);
                socket.removeListener(
                    "get-generate-document-part",
                    getStreamDocument
                );

                // const { mermaid } = data;
                // setText((prevText) => prevText + mermaid);
            }
        );
    };

    React.useEffect(() => {
        socketRef.current = socketIOClient(host);
    }, []);

    React.useEffect(() => {
        if (text) {
            const md = require("markdown-it")();
            const str = md.render(text);
            setContent(str);
        }
    }, [text]);

    React.useEffect(() => {
        // Emit the next part whenever the number changes
        // setTextPart((preText) => preText + text);
        if (socketRef.current) {
            if (number <= 1) {
                onGenerateDocument();
            }
        }
    }, [number, socketRef]);

    // useEffect(() => {
    //     editor?.commands.setContent(textPart);
    //     console.log("text: ", textPart);
    //     // console.log("content: ", content);
    // }, [textPart]);

    React.useEffect(() => {
        editor?.commands.setContent(content);
        // console.log("content: ", content);
    }, [editor?.commands, content]);

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
                            w="32px"
                            p={0}
                            onClick={() => editor.chain().focus().undo().run()}
                            isDisabled={!editor.can().undo()}
                        >
                            <Icons.RotateLeft />
                        </Button>
                        <Button
                            p={4}
                            onClick={() => editor.chain().focus().redo().run()}
                            isDisabled={!editor.can().redo()}
                        >
                            <Icons.RotateRight />
                        </Button>

                        <Button
                            // className={classNames("menu-Button", {
                            //     "is-active": editor.isActive("bold"),
                            // })}
                            onClick={toggleBold}
                        >
                            <Icons.Bold />
                        </Button>
                        <Button
                            // className={classNames("menu-Button", {
                            //     "is-active": editor.isActive("underline"),
                            // })}
                            onClick={toggleUnderline}
                        >
                            <Icons.Underline />
                        </Button>
                        <Button
                            // className={classNames("menu-Button", {
                            //     "is-active": editor.isActive("intalic"),
                            // })}
                            onClick={toggleItalic}
                        >
                            <Icons.Italic />
                        </Button>
                        <Button
                            // className={classNames("menu-Button", {
                            //     "is-active": editor.isActive("strike"),
                            // })}
                            onClick={toggleStrike}
                        >
                            <Icons.Strikethrough />
                        </Button>
                        <Button
                            // className={classNames("menu-Button", {
                            //     "is-active": editor.isActive("code"),
                            // })}
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
