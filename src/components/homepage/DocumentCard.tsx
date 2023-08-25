import {
    Avatar,
    Box,
    Card,
    CardBody,
    HStack,
    Image,
    Stack,
    Text,
} from "@chakra-ui/react";
import { PopoverDocumentEdition } from "components/PopoverDocumentEdition";
import { ReadMore } from "components/ReadMore";
import format from "date-fns/format";
import { useRouter } from "next/router";

type TDocumentCardProps = {
    selection: any;
};

export const DocumentCard = ({ selection }: TDocumentCardProps) => {
    const router = useRouter();
    return (
        <Card
            p={0}
            cursor="pointer"
            fontWeight="bold"
            // _hover={{
            //     bg: "blackAlpha.300",
            // }}
            bg="blackAlpha.200"
            onClick={() => {
                router.push(`/documentsTest2/${selection.id}`);
            }}
            key={selection.id}
        >
            <CardBody p={0}>
                {/* <Box w="full" h="140px" maxH="140px">
                    <Image
                        w="full"
                        h="full"
                        alt="img"
                        src="https://gamma.app/_next/static/media/placeholderBackground.e75ddbc7.svg"
                    />
                </Box> */}
                <Stack h="200px" p="12px" color="black" bg="white">
                    <Text
                        h="2rem"
                        fontSize="xl"
                        lineHeight="normal"
                        fontWeight="400"
                    >
                        {selection.projectName}
                    </Text>
                    <ReadMore
                        overflow="auto"
                        flex={1}
                        onClick={(e) => e.stopPropagation()}
                        numberOfChars={100}
                        text={selection.description || ""}
                        h="2rem"
                        fontSize="md"
                        lineHeight="normal"
                        fontWeight="400"
                    />
                    <HStack justify="space-between">
                        {/* left */}
                        <HStack>
                            <Avatar w="24px" h="24px" />
                            <Box>
                                <Text fontSize="xs">Created by you</Text>
                                <Text fontSize="11px" color="#ada8a8">
                                    {format(
                                        new Date(selection.createdAt),
                                        "dd MMM yyyy"
                                    )}
                                </Text>
                            </Box>
                        </HStack>
                        <PopoverDocumentEdition
                            selection={selection}
                            document_id={selection.id}
                        />
                    </HStack>
                </Stack>
            </CardBody>
        </Card>
    );
};
