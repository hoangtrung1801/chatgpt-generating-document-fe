import { ArrayInput, ChipField, Datagrid, DateInput, Edit, ImageField, List, NumberField, NumberInput, SelectInput, SimpleForm, SimpleFormIterator, TextField, TextInput } from "react-admin";

export const RecipeList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            {/* <DateField source="createdAt" />
            <DateField source="updatedAt" /> */}
            <TextField source="name" />
            <TextField source="description" />
            <NumberField source="numberOfFork" />
            <ChipField source="mode" />
            <ImageField source="imageUrl" />
            <TextField source="cookTime.id" />
        </Datagrid>
    </List>
);

export const RecipeEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="id" disabled/>
            <TextInput source="name" />
            <TextInput source="description" />
            <SelectInput source="mode" choices={[{id: 'PUBLIC', name: 'Public'}, {id:"PRIVATE", name: 'Private'}]}/>
            <TextInput source="imageUrl" />
            <TextInput source="forkFrom" />
            <ArrayInput source="ingredients"><SimpleFormIterator><TextInput source="id" />
<TextInput source="name" />
<NumberInput source="amount" />
<TextInput source="unit" /></SimpleFormIterator></ArrayInput>
            <TextInput source="cookTime.id" />
            <TextInput source="nutrition.id" />
            <ArrayInput source="comments"><SimpleFormIterator><TextInput source="id" />
<DateInput source="createdAt" />
<DateInput source="updatedAt" />
<TextInput source="message" /></SimpleFormIterator></ArrayInput>
            <ArrayInput source="catalogs"><SimpleFormIterator><TextInput source="id" />
<DateInput source="createdAt" />
<DateInput source="updatedAt" />
<TextInput source="name" />
<TextInput source="description" /></SimpleFormIterator></ArrayInput>
            <TextInput source="user.id" />
            <ArrayInput source="stars"><SimpleFormIterator><TextInput source="id" />
<DateInput source="createdAt" />
<DateInput source="updatedAt" />
<TextInput source="username" />
<TextInput source="name" />
<TextInput source="phone" />
<TextInput source="address" />
<TextInput source="role" />
<TextInput source="description" />
<TextInput source="avatarUrl" /></SimpleFormIterator></ArrayInput>
        </SimpleForm>
    </Edit>
);
