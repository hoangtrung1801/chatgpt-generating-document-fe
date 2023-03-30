import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertFromHTML, convertToRaw } from "draft-js";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import draftToHtml from "draftjs-to-html";
import { Box } from "@chakra-ui/react";
import useResultStore from "stores/useResultStore";

const test =
    "<body><h1>1. Introduction</h1><h2>1.1 Purpose of Project:</h2><p>The purpose of this software development project is to create a chat app that helps school students to communicate with their friends in a convenient and easy way.</p><h2>1.2 Scope of the Work Area:</h2><p>This app will be designed for use within the school campus, and it will ensure that students can communicate without any disruptions or security concerns.</p><h1>2. Product Overview</h1><ul><li><h2>2.1 Login:</h2><p>Users can create a profile and login to their account with their email and password.</p></li><li><h2>2.2 Registration:</h2><p>New users can easily create a profile by providing their basic details, such as name, email, and other necessary information.</p></li><li><h2>2.3 Search:</h2><p>Users can search for other users by their name, username, or other details.</p></li></ul></body>";

const data =
    "\n1. Introduction\n\n1.1 Purpose of Project:\nThe purpose of this software development project is to create a chat app that helps school students to communicate with their friends in a convenient and easy way.\n\n1.2 Scope of the Work Area:\nThis app will be designed for use within the school campus, and it will ensure that students can communicate without any disruptions or security concerns.\n\n2. Product Overview\n\nThe chat app will have the following features:\n\n2.1 Login:\nUsers can create a profile and login to their account with their email and password.\n\n2.2 Registration:\nNew users can easily create a profile by providing their basic details, such as name, email, and other necessary information.\n\n2.3 Search:\nUsers can search for other users by their name, username, or other details.\n\n2.4 Chat:\nUsers can have private and group conversations with their friends.\n\n2.5 Attach File:\nUsers can easily attach files such as images, videos, and documents to their chats.\n\n2.6 Send Stamp:\nUsers can send stamps as unique icons to express their emotions.\n\n2.7 Emotion:\nUsers can add emoticons and emojis in their chats.\n\n2.8 Find Conversation:\nUsers can easily find their previous conversations with their friends.\n\n2.9 Find Chat:\nUsers can search for a chat or conversation within the app.\n\n2.10 Delete Chat:\nUsers can delete a chat or conversation that they no longer need.\n\n2.11 Make Seen:\nUsers can check whether their messages have been seen or not.\n\n2.12 Change Title:\nUsers can edit the title of a conversation or group chat.\n\n2.13 Change Avatar:\nUsers can upload a profile picture and modify it whenever they want.\n\n2.14 Edit Profile:\nUsers can edit the details of their user profile such as name, email, password, etc.\n\n2.15 Edit Setting:\nUsers can modify their app settings, such as notification settings and privacy settings.\n\n2.16 Quick find friend nearby:\nUsers can find friends nearby who are also using the app.\n\n3. Product Features\n\nHere are the key features that are required for the chat app:\n\n3.1 User Management:\nThe app should require users to sign up and create a profile before using the app to chat with friends.\n\n3.2 Chat Management:\nThe app should offer private messaging and group chat features. It should also allow users to attach files, send stamps, and use emoticons and emojis to express themselves better.\n\n3.3 Search and find:\nThe app should allow users to search for other users, conversations, and chat groups within the app.\n\n3.4 Ease of use:\nThe app should be user-friendly and intuitive, allowing users to easily navigate and understand its features.\n\n3.5 Security and Privacy:\nThe app should ensure privacy and safety for its users. It should have a secure login process, and all messages and chats should be encrypted to prevent unauthorized access.\n\n4. Conclusion\n\nIn conclusion, the chat app should be designed with user convenience, security, and functionality in mind. The features of the app should enable students within the school campus to enjoy a seamless chatting experience, allowing them to stay in touch and communicate effectively with their friends";

// const result = data
//     .split("\n")
//     .filter((str) => str.trim() !== "")
//     .join("\n");
function ResultEditor() {
    const { result  } = useResultStore();
    const _contentState = ContentState.createFromText(result);
    // const Blocks = convertFromHTML(test);
    // const _contentState = ContentState.createFromBlockArray(
    //     Blocks.contentBlocks,
    //     Blocks.entityMap
    // );
    const raw = convertToRaw(_contentState); // RawDraftContentState JSON
    const [contentState, setContentState] = useState(raw); // ContentState JSON
    const handleOnclick = () => {
        // const output = contentState.blocks.map((item, index) => item.text).join("");
        const r = draftToHtml(contentState);
        console.log(r);
    };

    return (
        <Box>
            <Text fontSize="28px" fontWeight="bold" textAlign="center">
                Documentation
            </Text>
            <HStack mt={8} gap={4} justifyContent="flex-end">
                <Button
                    onClick={handleOnclick}
                    fontSize="18px"
                    colorScheme={"blue"}
                >
                    Save Document
                </Button>
                <Button
                    onClick={handleOnclick}
                    fontSize="18px"
                    colorScheme={"blue"}
                >
                    Generate Code
                </Button>
            </HStack>
            <Editor
                defaultContentState={contentState}
                onContentStateChange={setContentState}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                toolbar={{
                    options: ["inline", "blockType"],
                }}
                hashtag={{
                    separator: " ",
                    trigger: "@",
                }}
                mention={{
                    separator: " ",
                    trigger: "@",
                }}
            />
        </Box>
    );
}

export default ResultEditor;
