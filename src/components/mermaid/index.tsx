import { Box, Flex, Stack } from "@chakra-ui/react";
import mermaid from "mermaid";
import React, { useEffect } from "react";

mermaid.initialize({
    startOnLoad: true,
    theme: "default",
    securityLevel: "loose",
    themeCSS: `
    g.classGroup rect {
      fill: #282a36;
      stroke: #6272a4;
    } 
    g.classGroup text {
      fill: #f8f8f2;
    }
    g.classGroup line {
      stroke: #f8f8f2;
      stroke-width: 0.5;
    }
    .classLabel .box {
      stroke: #21222c;
      stroke-width: 3;
      fill: #21222c;
      opacity: 1;
    }
    .classLabel .label {
      fill: #f1fa8c;
    }
    .relation {
      stroke: #ff79c6;
      stroke-width: 1;
    }
    #compositionStart, #compositionEnd {
      fill: #bd93f9;
      stroke: #bd93f9;
      stroke-width: 1;
    }
    #aggregationEnd, #aggregationStart {
      fill: #21222c;
      stroke: #50fa7b;
      stroke-width: 1;
    }
    #dependencyStart, #dependencyEnd {
      fill: #00bcd4;
      stroke: #00bcd4;
      stroke-width: 1;
    } 
    #extensionStart, #extensionEnd {
      fill: #f8f8f2;
      stroke: #f8f8f2;
      stroke-width: 1;
    }`,
    fontFamily: "Fira Code",
    parseError(err, hash) {
        console.error("Mermaid parsing error:", err, hash);
    },
});

export type MermaidProps = {
    chart: string;
};

const Mermaid = ({ chart }: MermaidProps) => {
    useEffect(() => {
        try {
            mermaid.contentLoaded();
        } catch (e) {
            // Handle any rendering errors
            console.error("Mermaid rendering error:", e.toString());
        }
    }, []);
    return (
        <Flex p={10} justify="center" overflow="auto" className="mermaid">
            {chart}
        </Flex>
    );
};

export default Mermaid;
