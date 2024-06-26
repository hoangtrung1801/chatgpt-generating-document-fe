import { BlockNoteEditor, Block } from "@blocknote/core";
import { Editor } from "@milkdown/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import "@milkdown/theme-nord/style.css";
import useCurrentUser from "lib/hooks/useCurrentUser";
import useSelection from "lib/hooks/useSelection";
import { useRouter } from "next/router";
// import { diagram } from "@milkdown/plugin-diagram";
import { useEffect, useState } from "react";

import "@blocknote/core/style.css";
import CustomButton from "components/common/CustomButton";

const markdown = `
# Milkdown Next Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **Next**.`;

const data = `<!DOCTYPE html>
<html>
<head>
    <title>Proposal Document</title>
</head>
<body>
    <h1>Proposal Document</h1>

    <h2>1. Introduction</h2>
    <p>The purpose of the software, My Social App, is to provide a prominent social networking platform that connects people around the world. It enables users to create profiles, share content like photos and videos, and engage with friends and family through posts, comments, and reactions. The software aims to facilitate communication, networking, and information sharing on a global scale.</p>
    <p>The intended audience for My Social App includes individuals of all ages who are interested in connecting with others, sharing their experiences, and staying updated with the latest trends and events.</p>

    <h2>2. Project Overview</h2>
    <p>The software will be developed using a combination of programming languages, including HTML, CSS, JavaScript, and Python. The front-end will be built using HTML and CSS for the user interface design, while JavaScript will be used for client-side interactivity. The back-end will be developed using Python to handle server-side logic and database management.</p>
    <p>The software will be compatible with major operating systems, including Windows, macOS, and Linux. It will be designed to be responsive and accessible, allowing users to access the platform from various devices, including desktop computers, laptops, tablets, and smartphones.</p>
    <p>The development methodology that will be used for this project is the Agile methodology. This approach will allow for iterative and incremental development, ensuring that the software meets the evolving needs and requirements of the users.</p>

    <h2>3. Functional Objectives</h2>
    <ul>
        <li>User Profiles: Allow users to create and customize their profiles, including adding profile pictures, personal information, and interests.</li>
        <li>Posts and Comments: Enable users to create posts and engage in discussions by commenting on others' posts.</li>
        <li>Reactions: Provide users with the ability to react to posts and comments using emojis or other predefined reactions.</li>
        <li>Groups: Support the creation and management of interest-based groups, where users can join and participate in discussions with like-minded individuals.</li>
        <li>Events: Allow users to create and discover events, RSVP, and share event details with their connections.</li>
        <li>Privacy Settings: Give users control over their privacy settings, allowing them to choose who can view their profile and content.</li>
        <li>Notifications: Provide notifications to users for activities such as new friend requests, comments on their posts, and upcoming events.</li>
        <li>Search Functionality: Enable users to search for other users, groups, events, and specific content within the platform.</li>
        <li>Messaging: Include a messaging feature that allows users to send private messages to their connections.</li>
        <li>User Recommendations: Provide recommendations for users to connect with based on their interests and connections.</li>
        <li>Reporting and Moderation: Have reporting and moderation features to address inappropriate content or behavior.</li>
        <li>Mobile App: Develop a mobile app for users to access and use the platform on their smartphones.</li>
        <li>Analytics and Insights: Provide analytics and insights to users, allowing them to track their engagement, reach, and other relevant metrics.</li>
    </ul>


    <h2>4. Non-functional Objectives</h2>
    <pre class="mermaid">
  graph LR
      A --- B
      B-->C[fa:fa-ban forbidden]
      B-->D(fa:fa-spinner);
    </pre>
    <svg width="400" height="110">
  <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
  Sorry, your browser does not support inline SVG.  
</svg>
    <ul>
        <li>Performance: Ensure that the software is fast and responsive, with minimal loading times and smooth user interactions.</li>
        <li>Security: Implement robust security measures to protect user data and prevent unauthorized access or breaches.</li>
        <li>Scalability: Design the software to handle a large number of users and content without compromising performance.</li>
        <li>Usability: Create a user-friendly interface with intuitive navigation and clear instructions to enhance the user experience.</li>
        <li>Reliability: Ensure that the software is stable and reliable, minimizing downtime and errors.</li>
    </ul>

    <h2>5. Project Scope</h2>
    <p>The scope of the project includes the development of the My Social App software, including all the features and functionalities mentioned in the functional objectives section. The software will be designed to run on major operating systems and devices, providing a seamless user experience across different platforms.</p>
    <p>However, there are some constraints and limitations that may impact the development or delivery of the software. These include:</p>
    <ul>
        <li>Time constraints: The project must be completed within a specified timeframe to meet the desired launch date.</li>
        <li>Resource limitations: The project team has a limited budget and resources available for development.</li>
        <li>Technical constraints: The software must be compatible with the chosen programming languages and operating systems.</li>
        <li>Legal and regulatory requirements: The software must comply with relevant laws and regulations regarding user privacy and data protection.</li>
    </ul>

    <h2>6. Project Plan</h2>
    <p>The project will be divided into several phases, each with specific tasks and milestones. The timeline for the project is as follows:</p>
    <ul>
        <li>Phase 1: Requirements Gathering and Analysis (2 weeks)</li>
        <li>Phase 2: Design and Prototyping (3 weeks)</li>
        <li>Phase 3: Development and Testing (6 weeks)</li>
        <li>Phase 4: Deployment and Launch (1 week)</li>
        <li>Phase 5: Post-launch Support and Maintenance (ongoing)</li>
    </ul>
    <p>Throughout the project, regular meetings and progress updates will be conducted to ensure that the project stays on track and any issues or risks are addressed in a timely manner.</p>

    <h2>7. Conclusion</h2>
    <p>In conclusion, My Social App aims to provide a prominent social networking platform that connects people around the world. The software will offer a wide range of features and functionalities, including user profiles, posts and comments, reactions, groups, events, privacy settings, notifications, search functionality, messaging, user recommendations, reporting and moderation, mobile app support, and analytics and insights.</p>
    <p>We are confident in our ability to deliver the project according to the specified objectives and requirements. With the proposed project plan and the expertise of our team, we believe that My Social App will become a successful and influential platform in the field of social networking.</p>

    <script type="module">
          import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
          $(document).ready(function () {
            mermaid.initialize();
          });
        </script>
</body>
</html>`;

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
    // Editor.make().use(diagram).create();

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
                const blocks: Block[] = await editor.HTMLToBlocks(
                    // selection?.document
                    data
                );
                editor.replaceBlocks(editor.topLevelBlocks, blocks);
            };
            getBlocks();
        }
    }, [editor, selection?.document]);

    return (
        <Stack className="white" spacing={4}>
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
                {/* {isSelectionLoading || !selection?.document || !isClient ? (
                    "Loading..."
                ) : (
                    <BlockNoteView editor={editor} />
                )} */}
                <BlockNoteView editor={editor} />
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
