import { Box, Heading } from "@chakra-ui/react";
import { LayoutCreateProject } from "components/create-project/components/Layout";
import TipTapEditorWithSocket from "components/TipTapEditorWithSocket";
// import SimpleEditor from "components/TipTapEditor";
import dynamic from "next/dynamic";
const SimpleEditor = dynamic(() => import("components/TipTapEditor"), {
    ssr: false,
});

const host = "http://localhost:3000";

const TestSocketPage = () => {
    // const socketRef = React.useRef(null);
    // const [text, setText] = React.useState("");
    // const [number, setNumber] = React.useState(1);

    // const onGenerateDocument = () => {
    //     const socket: Socket = socketRef.current;

    //     const getStreamDocument = (data) => {
    //         setText((prevText) => prevText + data);
    //     };

    //     socket.on("get-generate-document-part", getStreamDocument);
    //     // socket.once("generate-document-part-complete", () => {
    //     //     setNumber((prevNumber) => prevNumber + 1); // Move on to the next part
    //     // });

    //     socket.emit(
    //         "generate-document-part",
    //         {
    //             selectionId: 226,
    //             partIndex: number,
    //         },
    //         (data) => {
    //             // xong
    //             // setnUmber
    //             setNumber((prevNumber) => prevNumber + 1);
    //             console.log("data", data);
    //             socket.removeListener(
    //                 "get-generate-document-part",
    //                 getStreamDocument
    //             );
    //         }
    //     );
    // };

    // React.useEffect(() => {
    //     socketRef.current = socketIOClient(host);
    // }, []);
    // React.useEffect(() => {
    //     // Emit the next part whenever the number changes
    //     if (socketRef.current) {
    //         if (number <= 1) {
    //             onGenerateDocument();
    //         }
    //     }
    // }, [number, socketRef]);
    // console.log("text: ", text);

    return (
        <LayoutCreateProject page="Home">
            {/* <Button onClick={onGenerateDocument}>Generate document</Button> */}
            <TipTapEditorWithSocket />
        </LayoutCreateProject>
    );
};

export default TestSocketPage;
