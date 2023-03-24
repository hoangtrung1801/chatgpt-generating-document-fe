import {
    Datagrid,
    Edit,
    List,
    RichTextField,
    SimpleForm,
    TextField,
    TextInput,
} from "react-admin";

export const ChatgptBriefList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            {/* <TextField source="answer" /> */}
            {/* <ReferenceField source="selectedOptionId" reference="selections" /> */}
        </Datagrid>
    </List>
);

export const ChatgptBriefEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" />
            <RichTextField source="answer" />
        </SimpleForm>
    </Edit>
);
