import type { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button: ComponentStyleConfig = {
    baseStyle: {
        w: "100%",
        minW: "100px",
        borderRadius: "100px",
        fontWeight: "500",
        lineHeight: 1,
        display: "flex",
        align: "center",
        transition: "background-color 0.5s ease 0s",
    },

    variants: {
        primary: {
            bg: "rgb(0, 102, 153)",
            background: "rgb(0, 102, 255)",
            color: "#fff",

            _hover: {
                bg: "rgb(0, 51, 153)",
                background: "rgb(0, 51, 153)",
                color: "#fff",
            },

            _active: {
                // bg: "#B1C36B",
                // background: "#B1C36B",
                // backdropFilter: "blur(3px)",
            },

            _disabled: {
                background: "rgb(0, 102, 255)",
                opacity: 0.5,
            },
        },
    },

    sizes: {
        sm: {
            h: "48px",
        },

        md: {
            h: "52px",
        },
    },

    // The default variant value
    defaultProps: {
        variant: "primary",
    },
};
