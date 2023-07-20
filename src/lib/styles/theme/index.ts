import { extendTheme } from "@chakra-ui/react";
import { Button } from "./components";

const customTheme = {
    components: {
        Button,
    },
};

export default extendTheme(customTheme);
