import clsx from "clsx";
import mermaid from "mermaid";
import type { FC } from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNodeViewContext } from "@prosemirror-adapter/react";
import { Box } from "@chakra-ui/react";

const Diagram: FC = () => {
    // const code = useMemo(() => node.attrs.value, [node.attrs.value]);
    const { node, setAttrs, selected } = useNodeViewContext();
    const code = useMemo(() => node.attrs.value, [node.attrs.value]);
    const id = node.attrs.identity;
    const codeInput = useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = useState("preview");
    const codePanel = useRef<HTMLDivElement>(null);
    const rendering = useRef(false);

    const renderMermaid = useCallback(async () => {
        const container = codePanel.current;
        if (!container) return;

        // if (code.length === 0) return;
        if (rendering.current) return;

        mermaid.initialize({
            startOnLoad: false,
            // theme: darkMode ? "dark" : "default",
        });
        rendering.current = true;
        const { svg, bindFunctions } = await mermaid.render(id, code);
        rendering.current = false;
        container.innerHTML = svg;
        bindFunctions?.(container);
    }, []);

    useEffect(() => {
        requestAnimationFrame(() => {
            renderMermaid();
        });
    }, [renderMermaid, value]);

    return (
        <Box>
            <Box ref={codePanel} />
        </Box>
    );
};

export default Diagram;
