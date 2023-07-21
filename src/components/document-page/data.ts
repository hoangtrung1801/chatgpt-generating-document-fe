export const checkEmptyOption = (arr: Array<any> = [], idx: number) => {
    if (arr[idx] && arr[idx].length !== 0) return !Boolean(arr[idx]);
    return true;
};

export const items = [
    {
        id: 1,
        title: "Introduction",
        content: ["1.1. Purpose"],
    },
    {
        id: 2,
        title: "Project perspective",
        content: ["2.1. User interfaces"],
    },
    {
        id: 3,
        title: "User characteristics",
        content: ["3.1. User characteristics"],
    },
];

export const ColumnPreview = [
    {
        id: 1,
        name: "Table Content",
        items: items,
    },
];
