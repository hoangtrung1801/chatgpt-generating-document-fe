import { create } from "zustand";
export interface ITableContentItem {
    id: number;
    title: string;
    content: string;
}

export interface ITableContent {
    data: Array<ITableContentItem>;
    updateData: (item: ITableContentItem) => void;
}

const useTableContent = create<ITableContent>((set, get) => ({
    data: [
        {
            id: 1,
            title: "Introduction",
            content: "1.1. Purpose",
        },
        {
            id: 2,
            title: "Project perspective",
            content: "2.1. User interfaces",
        },
        {
            id: 3,
            title: "User characteristics",
            content: "3.1. User characteristics",
        },
    ],
    updateData: (item) =>
        set({
            data: get().data.map((_) => {
                if (_.id === item.id)
                    return {
                        ..._,
                        content: item.content,
                    };
                else return _;
            }),
        }),
}));
export default useTableContent;
