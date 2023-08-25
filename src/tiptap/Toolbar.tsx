import React, { useCallback } from "react";
import { Editor } from "@tiptap/react";
import {
    RiBold,
    RiItalic,
    RiStrikethrough,
    RiCodeSSlashLine,
    RiEmotionLine,
    RiH1,
    RiH2,
    RiH3,
    RiH4,
    RiH5,
    RiH6,
    RiParagraph,
    RiListOrdered,
    RiListUnordered,
    RiCodeBoxLine,
    RiLink,
    RiLinkUnlink,
    RiDoubleQuotesL,
    RiSeparator,
    RiTextWrap,
    RiFormatClear,
    RiArrowGoBackLine,
    RiArrowGoForwardLine,
    RiShareFill,
    RiSave2Fill,
} from "react-icons/ri";
import { FaFileExport } from "react-icons/fa";
import { saveAs } from "file-saver";
import { BoxProps, Button, Divider, HStack } from "@chakra-ui/react";

// @ts-ignore
import htmlDocx from "html-docx-js/dist/html-docx";

interface ToolbarProps extends BoxProps {
    editor: Editor;
    onSave: any;
}

function Toolbar({ editor, onSave, ...rest }: ToolbarProps) {
    console.log("editor:", editor.isEditable);
    const handleExport = () => {
        const converted = htmlDocx.asBlob(editor.getHTML());
        saveAs(converted, "generateDocument.docx");
    };
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
    return (
        <HStack
            {...rest}
            // maxW="900px"
            p="10px"
            borderBottom="1px"
            borderColor="#edf1f6"
        >
            <Button
                p={0}
                h="36px"
                variant="secondary_2"
                isActive={editor.isActive("bold")}
                onClick={toggleBold}
            >
                <RiBold />
            </Button>

            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                isActive={editor.isActive("intalic")}
                onClick={toggleItalic}
            >
                <RiItalic />
            </Button>
            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                isActive={editor.isActive("strike")}
                onClick={toggleStrike}
            >
                <RiStrikethrough />
            </Button>

            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                isActive={editor.isActive("code")}
                onClick={toggleCode}
            >
                <RiCodeSSlashLine />
            </Button>
            <Divider h="30px" w="1px" orientation="vertical" />
            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                isActive={editor.isActive("heading", { level: 1 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
            >
                <RiH1 />
            </Button>
            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                isActive={editor.isActive("heading", { level: 2 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
            >
                <RiH2 />
            </Button>
            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                isActive={editor.isActive("heading", { level: 3 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
            >
                <RiH3 />
            </Button>
            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                isActive={editor.isActive("heading", { level: 4 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 4 }).run()
                }
            >
                <RiH4 />
            </Button>
            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                isActive={editor.isActive("heading", { level: 5 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 5 }).run()
                }
            >
                <RiH5 />
            </Button>
            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                isActive={editor.isActive("heading", { level: 6 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 6 }).run()
                }
            >
                <RiH6 />
            </Button>
            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                onClick={() => editor.chain().focus().setParagraph().run()}
            >
                <RiParagraph />
            </Button>

            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
                <RiListOrdered />
            </Button>
            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <RiListUnordered />
            </Button>

            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
                <RiCodeBoxLine />
            </Button>
            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
            >
                <RiDoubleQuotesL />
            </Button>
            <Button
                p={0}
                variant="secondary_2"
                h="36px"
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                <RiSeparator />
            </Button>

            <Divider h="30px" w="1px" orientation="vertical" />

            <Button
                p={0}
                h="36px"
                onClick={() => editor.chain().focus().undo().run()}
                isDisabled={!editor.can().undo()}
            >
                <RiArrowGoBackLine />
            </Button>
            <Button
                p={0}
                h="36px"
                onClick={() => editor.chain().focus().redo().run()}
                isDisabled={!editor.can().redo()}
            >
                <RiArrowGoForwardLine />
            </Button>
            <Button
                p={0}
                h="36px"
                onClick={handleExport}
                // isDisabled={!editor.can().redo()}
            >
                <FaFileExport />
            </Button>
            <Button p={0} h="36px" onClick={() => onSave(editor.getHTML())}>
                <RiSave2Fill />
            </Button>
        </HStack>
    );
}

export { Toolbar };
