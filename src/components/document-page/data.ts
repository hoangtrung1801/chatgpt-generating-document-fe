import { schema_array_string_required, schema_string } from "form/schema";
import * as Yup from "yup";
export const schema_create_section = Yup.object({
    title: schema_string,
    subsection: schema_array_string_required,
});

export interface IDefaultValue {
    id?: number;
    title: string;
    subsection: Array<string>;
}
export const defaultValues: IDefaultValue = {
    title: "",
    subsection: [""],
};
export type TSection = {
    id?: number;
    title: string;
    content: string[];
};

export type TColumn = {
    id: number;
    name: string;
    tableOfContents: Array<TSection>;
};

export const checkEmptyOption = (arr: Array<any> = [], idx: number) => {
    if (arr[idx] && arr[idx].length !== 0) return !Boolean(arr[idx]);
    return true;
};

export const HandleUpdateColumns = (
    sourceColumns: TColumn[],
    sectionData: IDefaultValue
) => {
    const updatedColumnPreview = sourceColumns;
    const updatedItems = sourceColumns[0].tableOfContents.map((section) => {
        if (section.id === sectionData.id) {
            return {
                ...section,
                title: sectionData.title,
                content: sectionData.subsection,
            };
        } else return section;
    });
    updatedColumnPreview[0].tableOfContents = updatedItems;
    return updatedColumnPreview;
};

export const onDragEnd = (
    result: any,
    columns: TColumn[],
    updateColumns: any
) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.tableOfContents];
        const destItems = [...destColumn.tableOfContents];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        updateColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                tableOfContents: sourceItems,
            },
            [destination.droppableId]: {
                ...destColumn,
                tableOfContents: destItems,
            },
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.tableOfContents];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        updateColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                tableOfContents: copiedItems,
            },
        });
    }
};
