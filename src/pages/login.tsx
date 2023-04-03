import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link as ChakraLink,
    Stack,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { login } from "lib/api/auth";
import useCurrentUser, {
    API_URL as useCurrentUserEndpoint,
} from "lib/hooks/useCurrentUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { mutate } from "swr";
type Auth = {
    email?: string;
    password?: string;
};
export default function Login() {
    const [auth, setAuth] = useState<Auth>();

    const router = useRouter();

    const { currentUser, isLoading: isCurrentUserLoading } = useCurrentUser();

    const handleSubmit = () => {
        if (auth) {
            login(auth.email, auth.password).then((response) => {
                console.log(response);
                if (response.data) {
                    mutate(useCurrentUserEndpoint);
                    alert("login successful");
                    router.push("/");
                } else {
                    alert(response.message);
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
        console.log("auth : ", auth);
    }, [auth]);

    useEffect(() => {
        if (!isCurrentUserLoading && currentUser) {
            router.replace("/");
        }
    }, [currentUser, isCurrentUserLoading, router]);

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
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
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool{" "}
                        <ChakraLink color={"blue.400"}>features</ChakraLink> ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
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
                                <Checkbox>Remember me</Checkbox>

                                <ChakraLink color={"blue.400"}>
                                    <Link href="/signup">Sign up</Link>
                                </ChakraLink>
                            </Stack>
                            <Button
                                onClick={handleSubmit}
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                            >
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
