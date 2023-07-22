import { TColumn, TSection } from "components/document-page/data";
import { create } from "zustand";

export interface ITableContentItem {
    id: number;
    title: string;
    content: string;
}
export interface ITableContent {
    columns: TColumn[];
    updateColumns: (collumns: TColumn[]) => void;
}
export const sections: Array<TSection> = [
    {
        id: 1,
        title: "Introduction",
        content: ["Purpose"],
    },
    {
        id: 2,
        title: "Project perspective",
        content: ["User interfaces"],
    },
    {
        id: 3,
        title: "User characteristics",
        content: ["User characteristics"],
    },
];

export const DefaultValue: TColumn[] = [
    {
        id: 1,
        name: "Table Content",
        tableOfContents: sections,
    },
];

export const useTableContents = create<ITableContent>((set, get) => ({
    columns: DefaultValue,
    updateColumns: (columns) =>
        set({
            columns: columns,
        }),
}));
