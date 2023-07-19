import {
    Box,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link as ChakraLink,
    Stack,
    Text,
} from "@chakra-ui/react";
import { login } from "lib/api/auth";

import CustomButton from "components/common/CustomButton";
import { CustomToast } from "components/CustomToast";
import useCurrentUser, {
    API_URL as useCurrentUserEndpoint,
} from "lib/hooks/useCurrentUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { mutate } from "swr";
type Auth = {
    email?: string;
    password?: string;
};
export default function Login() {
    const [auth, setAuth] = useState<Auth>();
    const { addToast } = CustomToast();
    const [isSubmit, setIsSubmit] = useState(false);

    const router = useRouter();

    const { currentUser, isLoading: isCurrentUserLoading } = useCurrentUser();

    const handleSubmit = () => {
        if (auth) {
            setIsSubmit(true);
            login(auth.email, auth.password).then((response) => {
                console.log(response);
                if (response.data) {
                    mutate(useCurrentUserEndpoint);
                    addToast({ message: "Login successful", type: "success" });
                    router.push("/");
                } else {
                    setIsSubmit(false);
                    addToast({ message: response.message, type: "error" });
                }
            });
        }
    };

    const handleChangeEmail = (e: any) => {
        setAuth({
            email: e.target.value,
            password: auth?.password,
        });
    };

    const handleChangePassword = (e: any) => {
        setAuth({
            email: auth?.email,
            password: e.target.value,
        });
    };

    useEffect(() => {
        if (!isCurrentUserLoading && currentUser) {
            router.replace("/");
        }
    }, [currentUser, isCurrentUserLoading, router]);

    return (
        <Flex align={"center"} justify={"center"}>
            <Stack
                minW="40%"
                spacing={8}
                mx={"auto"}
                maxW={"lg"}
                py={12}
                px={6}
            >
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"}>Sign in to your account</Heading>
                    <Text fontSize={"lg"} color={"blackAlpha.600"}>
                        to enjoy all of our cool{" "}
                        <ChakraLink color={"blackAlpha.800"}>
                            features
                        </ChakraLink>{" "}
                        ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bgColor="blackAlpha.50"
                    // boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input onChange={handleChangeEmail} type="email" />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                onChange={handleChangePassword}
                                type="password"
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: "column", sm: "row" }}
                                align={"start"}
                                justify={"space-between"}
                            >
                                <Box></Box>
                                <Link href="/signup">
                                    <Text as="u" color={"blue.400"}>
                                        Sign up
                                    </Text>
                                </Link>
                            </Stack>
                            {isSubmit ? (
                                <CustomButton isLoading loadingText="login">
                                    Login
                                </CustomButton>
                            ) : (
                                <CustomButton onClick={handleSubmit}>
                                    Sign in
                                </CustomButton>
                            )}
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
