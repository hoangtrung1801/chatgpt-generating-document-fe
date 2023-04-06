import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { signup } from "lib/api/auth";
import ToastHook from "lib/hooks/useToastHook";
import { useRouter } from "next/router";
import { CustomToast } from "components/CustomToast";

type Signup = {
    name?: string;
    email?: string;
    password?: string;
};

export default function SignupCard() {
    const [signupInfo, setSignupInfo] = useState<Signup>();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const { addToast } = CustomToast();

    const handleSubmit = () => {
        setIsSubmit(true);
        if (signupInfo) {
            signup(signupInfo.name, signupInfo.email, signupInfo.password).then(
                (response) => {
                    console.log(response);
                    if (response.data) {
                        addToast({
                            message: "signup successfully",
                            type: "success",
                        });
                        router.push("/login");
                    } else {
                        setIsSubmit(false);
                        addToast({ message: response.message, type: "error" });
                        // alert(response.message);
                    }
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    // ToastHook("success", "ok");
                }
            );
        }
    };
    const handleChangeName = (e: any) => {
        setSignupInfo({
            name: e.target.value,
            email: signupInfo?.email,
            password: signupInfo?.password,
        });
    };
    const handleChangeEmail = (e: any) => {
        setSignupInfo({
            name: signupInfo?.name,
            email: e.target.value,
            password: signupInfo?.password,
        });
    };
    const handleChangePassword = (e: any) => {
        setSignupInfo({
            name: signupInfo?.name,
            email: signupInfo?.email,
            password: e.target.value,
        });
    };

    return (
        <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
        >
            <Stack spacing={8} mx={"auto"} minW="xl" py={12} px={6}>
                <Stack align={"center"}>
                    <Heading fontSize={"4xl"} textAlign={"center"}>
                        Sign up
                    </Heading>
                    <Text fontSize={"lg"} color={"gray.600"}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    boxShadow={"lg"}
                    p={8}
                >
                    <Stack spacing={4}>
                        <Box>
                            <FormControl id="lastName">
                                <FormLabel>Name</FormLabel>
                                <Input
                                    required
                                    onChange={handleChangeName}
                                    type="text"
                                />
                            </FormControl>
                        </Box>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input onChange={handleChangeEmail} type="email" />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    onChange={handleChangePassword}
                                    type={showPassword ? "text" : "password"}
                                />
                                <InputRightElement h={"full"}>
                                    <Button
                                        variant={"ghost"}
                                        onClick={() =>
                                            setShowPassword(
                                                (showPassword) => !showPassword
                                            )
                                        }
                                    >
                                        {showPassword ? (
                                            <ViewIcon />
                                        ) : (
                                            <ViewOffIcon />
                                        )}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            {isSubmit ? (
                                <Button
                                    isLoading
                                    loadingText="signup"
                                    colorScheme="teal"
                                    variant="outline"
                                >
                                    signup
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={"blue.400"}
                                    color={"white"}
                                    _hover={{
                                        bg: "blue.500",
                                    }}
                                >
                                    Sign up
                                </Button>
                            )}
                        </Stack>
                        <Stack pt={6}>
                            <Text color={"blue.400"} align={"center"}>
                                Already a user?{" "}
                                <Link href="/login">
                                    <Text as="u" color="blue.400">
                                        Login
                                    </Text>
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
