import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Textarea,
} from "@chakra-ui/react";
import React from "react";

function TypeShortDescriptionApp({
    shortDescriptionApp,
    isTyped,
    handleDescriptionChange,
    handleNameChange,
    handleSubmitDescription,
}: any) {
    return (
        <Flex h="full" flexDirection="column" gap="10" justifyContent="center">
            <Heading textAlign="center">What app do you want to build?</Heading>
            <FormControl>
                <FormLabel fontSize={18} fontWeight="bold">
                    Application name
                </FormLabel>
                <Input
                    value={shortDescriptionApp.name}
                    onChange={handleNameChange}
                    bg="white"
                    placeholder="Name..."
                />
                <FormLabel fontSize={18} fontWeight="bold" mt={4}>
                    Description
                </FormLabel>
                <Textarea
                    value={shortDescriptionApp.description}
                    onChange={handleDescriptionChange}
                    minHeight="200px"
                    bg="white"
                    placeholder="Description..."
                />
            </FormControl>
            <Button w="100px" size="lg" onClick={handleSubmitDescription}>
                Next
            </Button>
            <Alert hidden={isTyped} status="error">
                <AlertIcon />
                <AlertTitle>Missing some field!</AlertTitle>
                <AlertDescription>
                    Please enter a name and a description
                </AlertDescription>
            </Alert>
        </Flex>
    );
}

export default TypeShortDescriptionApp;
