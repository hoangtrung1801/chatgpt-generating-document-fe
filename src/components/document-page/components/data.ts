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
