import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Heading,
    Stack,
    useDisclosure,
} from "@chakra-ui/react";
import useSelection from "lib/hooks/useSelection";
import useUserStoriesOfSelection from "lib/hooks/useUserStoriesOfSelection";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CreateEpicModal from "./CreateEpicModal";
import CreateSprintModal from "./CreateSprintModal";
import EpicCard from "./EpicCard";
import SprintCard from "./SprintCard";
import SprintCardUserStory from "./SprintCardUserStory";

const EpicTab = () => {
    const router = useRouter();
    const documentId = Number(router.query.documentId);

    const [epics, setEpics] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { selection, isSelectionLoading } = useSelection(documentId);

    useEffect(() => {
        if (!isSelectionLoading && selection) {
            setEpics(selection.epic);
            console.log("selection", selection);
        }
    }, [isSelectionLoading, selection]);

    // log epics to console
    useEffect(() => {
        console.log("epics", epics);
    }, [epics]);

    return (
        <Stack direction={"column"} spacing={4}>
            <Box>
                <Button
                    leftIcon={<AddIcon />}
                    onClick={onOpen}
                    colorScheme="blue"
                >
                    Create Epic
                </Button>
            </Box>

            <Stack direction={"column"} spacing={4}>
                {epics &&
                    epics.map((epic) => <EpicCard key={epic.id} epic={epic} />)}
            </Stack>

            <CreateEpicModal isOpen={isOpen} onClose={onClose} />
        </Stack>
    );
};

export default EpicTab;
