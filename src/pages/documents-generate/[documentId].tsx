import { LayoutCreateProject } from "components/create-project/components/Layout";
import TipTapEditorWithSocket from "components/TipTapEditorWithSocket";
import React from "react";

type DocumentGeneratePageProps = {};

const DocumentGeneratePage = (props: DocumentGeneratePageProps) => {
    return (
        <LayoutCreateProject page="Home">
            {/* <Button onClick={onGenerateDocument}>Generate document</Button> */}
            <TipTapEditorWithSocket />
        </LayoutCreateProject>
    );
};

export default DocumentGeneratePage;
