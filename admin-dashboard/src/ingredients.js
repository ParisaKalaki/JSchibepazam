import * as React from 'react';
import { Create, SimpleForm, TextInput, required, SingleFieldList, ChipField, ReferenceArrayField } from 'react-admin';
import { List, Edit, DateInput,ReferenceInput,
     ReferenceManyField, ReferenceField, Datagrid, SimpleFormIterator,
     SelectInput, TextField, DateField, EditButton, ArrayField} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

export const IngredientList = () => (
        <List>
        <Datagrid>
            <TextField source="name" />
            <EditButton />
        </Datagrid>
        </List>
  );
export const IngredientCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" validate={[required()]}  />
        </SimpleForm>
    </Create>
);


export const IngredientEdit = () => (
    <Edit>
        <SimpleForm>
        <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

