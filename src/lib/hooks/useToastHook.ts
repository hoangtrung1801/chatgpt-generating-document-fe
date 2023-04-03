import { useToast } from "@chakra-ui/react";
import React from "react";

function ToastHook(status: any, title: any) {
    const toast = useToast();
    return toast({
        position: "top",
        title: title,
        status: status,
        duration: 3000,
        isClosable: true,
    });
}

export default ToastHook;
