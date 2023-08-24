export const convertToHTMLFormat = (HTMLBody: string): string => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <title>Document</title>
    </head>
    <body>
        ${HTMLBody}
    </body>
    </html>`;
};
