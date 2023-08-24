import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import socketIOClient, { Socket } from "socket.io-client";

const host = "http://localhost:3000";

const TestSocketPage = () => {
    const socketRef = React.useRef(null);

    const [text, setText] = React.useState("");

    const onGenerateDocument = () => {
        const socket: Socket = socketRef.current;

        let text = "";
        const getStreamDocument = (data) => {
            text += data;
            setText(text);
        };

        socket.on("get-generate-document-part", getStreamDocument);

        socket.emit(
            "generate-document-part",
            {
                selectionId: 226,
                partIndex: 1,
            },
            (data) => {
                console.log("data", data);
                socket.removeListener(
                    "get-generate-document-part",
                    getStreamDocument
                );
            }
        );
    };

    React.useEffect(() => {
        socketRef.current = socketIOClient(host);
        const socket: Socket = socketRef.current;

        console.log("socket connected");
        // socket.on("get-data", (arg, callback) => {
        //     console.log(arg);
        //     callback("got it");
        // });

        // ss(socket).on("get-data", (stream, data) => {
        //     console.log("stream", stream, data);

        //     let finalText = "";
        //     stream.on("data", (data) => {
        //         let binaryStr = "";
        //         for (const chr of data) {
        //             binaryStr += String.fromCharCode(chr);
        //         }
        //         // console.log(binaryStr);
        //         finalText += binaryStr;
        //         // setText(finalText);
        //     });

        //     stream.on("end", (data) => {
        //         console.log("end", data);
        //     });
        // });
    }, []);

    return (
        <Box>
            <Heading as="h1">Test socket page</Heading>
            <Button onClick={onGenerateDocument}>Generate document</Button>
            <Text>{text}</Text>
        </Box>
    );
};
export default TestSocketPage;
