import {
    ArrayInput,
    BooleanField,
    BooleanInput,
    Create,
    Datagrid,
    Edit,
    List,
    ReferenceField,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextField,
    TextInput,
} from "react-admin";

export const QuestionList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <TextField source="questionGPT" label="Question GPT" />
            <BooleanField source="status" />
            <ReferenceField source="categoryId" reference="categories" />
        </Datagrid>
    </List>
);

export const QuestionEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled />
            <TextInput source="name" />
            <TextInput source="description" multiline fullWidth resettable />
            <TextInput
                source="questionGPT"
                label="Question GPT"
                multiline
                fullWidth
            />
            <BooleanInput source="status" />
            <ReferenceInput source="categoryId" reference="categories" />
            <ArrayInput source="options" label="Options">
                <SimpleFormIterator>
                    <TextInput source="name" />
                    <TextInput source="description" />
                    <SelectInput
                        source="type"
                        choices={[
                            { id: "enough", name: "Enough" },
                            { id: "additional", name: "Additional" },
                        ]}
                    />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Edit>
);

export const QuestionCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="description" multiline fullWidth resettable />
            <TextInput
                source="questionGPT"
                label="Question GPT"
                multiline
                fullWidth
            />
            <BooleanInput source="status" defaultValue={true} />
            <ReferenceInput source="categoryId" reference="categories" />
            <SelectInput
                source="type"
                choices={[
                    { id: "yesno", name: "Yes/No choice" },
                    { id: "single", name: "Single choice" },
                ]}
            />
            <ArrayInput source="options" label="Options">
                <SimpleFormIterator>
                    <TextInput source="name" />
                    <TextInput source="description" />
                    {/* <BooleanInput source="isAdvanced" label="Advanced" /> */}
                    <SelectInput
                        source="type"
                        choices={[
                            { id: "enough", name: "Enough" },
                            { id: "additional", name: "Additional" },
                        ]}
                    />
                </SimpleFormIterator>
            </ArrayInput>
        </SimpleForm>
    </Create>
);
