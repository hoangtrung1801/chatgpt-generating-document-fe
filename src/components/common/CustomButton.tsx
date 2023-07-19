import { ButtonProps, ComponentDefaultProps, Button } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function CustomButton({
    children,
    ...props
}: ButtonProps & { children: ReactNode }) {
    return (
        <Button
            backgroundColor={"blackAlpha.700"}
            color="whiteAlpha.900"
            _hover={{ backgroundColor: "blackAlpha.800" }}
            {...props}
        >
            {children}
        </Button>
    );
}
