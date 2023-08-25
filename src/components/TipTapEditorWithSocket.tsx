import { Box, Button, HStack, Stack, useToast } from "@chakra-ui/react";
import React from "react";
// => Tiptap packages
import Heading from "@tiptap/extension-heading";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { updateDocument } from "lib/api/document";
import { useRouter } from "next/router";
import socketIOClient, { Socket } from "socket.io-client";
import { Toolbar } from "tiptap/Toolbar";
import TurndownService from "turndown";
import { CustomBlockExtension } from "./extension";
const turndownService = new TurndownService();

const host = "http://localhost:3000";
// Custom

type TipTapEditorWithSocketProps = {
    content?: string;
};

export default function TipTapEditorWithSocket({}: TipTapEditorWithSocketProps) {
    const socketRef = React.useRef(null);
    const toast = useToast();
    const router = useRouter();
    const selectionId = Number(router.query.documentId);

    const [text, setText] = React.useState("");
    const [content, setContent] = React.useState("");
    const [textPart, setTextPart] = React.useState("");
    const [number, setNumber] = React.useState(1);
    // const [loadingMermaid, setIsLoadingMermaid] = React.useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,
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
            if (number <= 7) {
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

    if (!editor) {
        return null;
    }

    const handleSaveChange = async (HTMLContent: string) => {
        try {
            const res = await updateDocument({
                selectionId: selectionId,
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
                w="fit-content"
                borderWidth={"1px"}
                borderColor="#c7cdd4"
                zIndex={2}
                bg="white"
                color="black"
            >
                <Box>
                    <Toolbar onSave={handleSaveChange} editor={editor} />

                    <EditorContent
                        onChange={(e) => console.log(e)}
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
                <Button variant="outline">Export</Button>
                <Button
                    onClick={() => handleSaveChange(editor.getHTML())}
                    variant="primary"
                >
                    Save Changes
                </Button>
            </HStack> */}
        </Stack>
    );
}
