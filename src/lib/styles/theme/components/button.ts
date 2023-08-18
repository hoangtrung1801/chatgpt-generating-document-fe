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
                _hover: {
                    background: "rgb(0, 102, 255) !important",
                },
            },
        },
        secondary: {
            bg: "blackAlpha.700",
            background: "blackAlpha.700",
            color: "whiteAlpha.900",

            _hover: {
                bg: "blackAlpha.800",
                background: "blackAlpha.800",
            },

            _active: {
                // bg: "#B1C36B",
                // background: "#B1C36B",
                // backdropFilter: "blur(3px)",
            },

            _disabled: {
                background: "blackAlpha.800",
                opacity: 0.5,
                _hover: {
                    background: "blackAlpha.800 !important",
                },
            },
        },
        outline: {
            bg: "transparent",
            background: "transparent",
            color: "#7E1AA1",
            fontSize: "16px",
            minHeight: "2rem",
            width: "fit-content",
            padding: "12px 16px",
            borderRadius: "md",
            borderWidth: "1px",
            borderColor: "#e5e0df",

            _hover: {
                bg: "#EBD2F4",
                background: "#EBD2F4",
            },

            _active: {
                // bg: "#B1C36B",
                // background: "#B1C36B",
                // backdropFilter: "blur(3px)",
            },

            _disabled: {
                background: "blackAlpha.800",
                opacity: 0.5,
                _hover: {
                    background: "blackAlpha.800 !important",
                },
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
