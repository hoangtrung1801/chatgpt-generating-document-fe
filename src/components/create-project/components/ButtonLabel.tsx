import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface IButtonLabelProps extends ButtonProps {
    children: any;
    isActive: boolean;
}
// #5E1379
const ButtonLabel = ({ children, isActive, ...rest }: IButtonLabelProps) => {
    return (
        <Button
            bg={`${isActive && "#5E1379"}`}
            color={`${isActive ? "white" : "#7E1AA1"}`}
            variant="outline"
            {...rest}
        >
            {children}
        </Button>
    );
};

export default ButtonLabel;
