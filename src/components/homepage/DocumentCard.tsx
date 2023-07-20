import {
    Card,
    CardBody,
    CardHeader,
    Flex,
    Heading,
    Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import format from "date-fns/format";

type TDocumentCardProps = {
    selection: any;
};

export const DocumentCard = ({ selection }: TDocumentCardProps) => {
    const router = useRouter();
    return (
        <Card
            p={4}
            borderRadius={12}
            cursor="pointer"
            fontWeight="bold"
            _hover={{
                bg: "blackAlpha.300",
            }}
            bg="blackAlpha.200"
            onClick={() => {
                router.push(`/documents/${selection.id}`);
            }}
            key={selection.id}
        >
            <CardHeader>
                <Flex>
                    <Heading mr="auto" display="inline-block" size="md">
                        {selection.projectName}
                    </Heading>
                    <Heading ml="auto" display="inline-block" size="md">
                        {format(new Date(selection.createdAt), "dd MMM yyyy")}
                    </Heading>
                </Flex>
            </CardHeader>
            <CardBody>
                <Text fontSize="md" lineHeight="normal" fontWeight="400">
                    {selection.description}
                </Text>
            </CardBody>
        </Card>
    );
};
