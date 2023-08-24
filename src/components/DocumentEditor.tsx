// import { updateDocument } from "@/api/documents";
import { Box, Button, HStack, useToast } from "@chakra-ui/react";
import { Editor } from "@tinymce/tinymce-react";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
// import { useMutation } from "react-query";
// @ts-ignore
import htmlDocx from "html-docx-js/dist/html-docx";

type DocumentEditorProps = {
    content: string;
};
//

const DocumentEditor = ({ content }: DocumentEditorProps) => {
    const [documentText, setDocumentText] = useState(content);
    const editorRef = useRef(null);
    const toast = useToast();
    // edit and save api here...
    const init = {
        height: "calc(100vh - 170px)",
        menubar: true,
        statusbar: false,
        external_plugins: {
            pluginId:
                "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs",
        },
        plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
        ],
        toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "link image " +
            "removeformat | help",
        content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
    };

    // const handleSave = useMutation(
    //     async () => {
    //         // const res = await updateDocument({
    //         //     document_id: documentId as string,
    //         //     data: {
    //         //         content: documentText,
    //         //     },
    //         // });
    //         // return res;
    //     },
    //     {
    //         onSuccess: async (data: any) => {
    //             toast({
    //                 description: data.message,
    //                 status: "success",
    //             });
    //         },
    //         onError: (error: any) => {
    //             toast({
    //                 description: error.message,
    //                 status: "error",
    //             });
    //         },
    //     }
    // );

    const handleExportToWord = () => {
        const converted = htmlDocx.asBlob(documentText);
        saveAs(converted, "generateDocument.docx");
    };
    return (
        <Box>
            <Editor
                apiKey="azo95xq4zkspyisl301b05fqpgp94r6z2ps7babdj3micl1r"
                // disabled={!isEdit}
                init={init}
                value={documentText}
                onEditorChange={(newText) => {
                    setDocumentText(newText);
                }}
            />
            <HStack justify="center" mt={4}>
                <Button
                    variant="primary"
                    onClick={handleExportToWord}
                    maxW="200px"
                >
                    Export to word
                </Button>
                <Button
                    variant="outline"
                    onClick={() => {
                        // isEdit ? handleSave.mutate() : setIsEdit(true);
                    }}
                    maxW="200px"
                >
                    Save change
                </Button>
            </HStack>
        </Box>
    );
};
export default DocumentEditor;
