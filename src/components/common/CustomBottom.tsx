import { ButtonProps, ComponentDefaultProps, Button } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function CustomButton({
    children,
    ...props
}: ButtonProps & { children: ReactNode }) {
    return (
        <Button
            backgroundColor={"gray.200"}
            _hover={{ backgroundColor: "gray.300" }}
            {...props}
        >
            {children}
        </Button>
    );
}
