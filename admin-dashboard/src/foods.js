import * as React from 'react';
import { Create, SimpleForm, TextInput, required, SingleFieldList, ChipField, ReferenceArrayField, ArrayInput } from 'react-admin';
import { List, Edit, DateInput,ReferenceInput,
     ReferenceManyField, ReferenceField, Datagrid, SimpleFormIterator,
     SelectInput, TextField, DateField, EditButton, ArrayField, AutocompleteInput} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';
import { useParams } from 'react-router-dom';

export const FoodList = () => (
        <List>
        <Datagrid>
            <TextField source="name" />
                <ArrayField source="Ingredients">
                    <SingleFieldList>
                        <ChipField source="name" />
                    </SingleFieldList>
                </ArrayField>
            <EditButton />
        </Datagrid>
        </List>
  );
export const FoodCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" validate={[required()]}  />
        </SimpleForm>
    </Create>
);


export const FoodEdit = (props) => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="image" />
        <ArrayInput source="Ingredients">
          <SimpleFormIterator>
            <ReferenceInput
              reference="ingredients"
              source="id"
              perPage={100}
            >
              <AutocompleteInput optionText="name" />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>
      </SimpleForm>
    </Edit>
  );

export const FIEdit = (props) => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <ReferenceManyField
          label="Ingredients"
          reference="ingredients"
          target="foodId"
        >
          <Datagrid>
            <TextField source="name" />
            <EditButton />
          </Datagrid>
        </ReferenceManyField>
      </SimpleForm>
    </Edit>
  );
