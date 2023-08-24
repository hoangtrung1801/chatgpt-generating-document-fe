import React from "react";
import { Editor, rootCtx, defaultValueCtx } from "@milkdown/core";
import { nord } from "@milkdown/theme-nord";
import { Milkdown, MilkdownProvider, useEditor } from "@milkdown/react";
import { commonmark } from "@milkdown/preset-commonmark";

import { diagram } from "@milkdown/plugin-diagram";
const data = `
# Milkdown

![greeting bear](/polar.jpeg)

> Milkdown is a WYSIWYG markdown editor framework.
>
> ...

You can check the output markdown text in **two columns editing**.

*   Features
    *   [x] 📝 **WYSIWYG Markdown** - Write markdown in an elegant way
    *   ...

***

You can add \`inline code\` and code block:

\`\`\`javascript
function main() {
  console.log('Hello milkdown!');
}
\`\`\`

> Tips: use <mod>+<enter> to exit blocks such as code block.

...

***

Use [emoji cheat sheet](https://www.webfx.com/tools/emoji-cheat-sheet/) such as \`:+1:\` to add emoji[^1].

You may notice the emoji filter while inputting values, try to type \`\\:baby\` to see the list.

...

Diagrams are powered by [mermaid](https://mermaid-js.github.io/mermaid/#/).

You can type \\\`\\\`\\\`mermaid to add diagrams.

\`\`\`mermaid
graph TD;
EditorState-->EditorView;
EditorView-->DOMEvent;
DOMEvent-->Transaction;
Transaction-->EditorState;
\`\`\`

...

Have fun!

[^1]: We use [tweet emoji](https://twemoji.twitter.com) to make emojis viewable across platforms.
`;

const MilkdownEditor = () => {
    // const editorInfo = useeditr
    const { editor } = useEditor((root) =>
        Editor.make()
            .config(nord)
            .config((ctx) => {
                ctx.set(rootCtx, root);
                ctx.set(defaultValueCtx, data);
            })
            .use(commonmark)
            .use(diagram)
    );

    return <Milkdown />;
};

const MilkdownWrapper = () => {
    return (
        <MilkdownProvider>
            <MilkdownEditor />
        </MilkdownProvider>
    );
};
export default MilkdownWrapper;
