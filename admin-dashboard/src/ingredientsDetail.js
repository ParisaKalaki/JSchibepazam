// in src/IngredientDetail.jsx
import { Edit, SimpleForm, TextInput } from 'react-admin';
import { useParams } from 'react-router-dom';

export const IngredientDetail = () => {
    const { id, songId } = useParams();
    return (
        <Edit resource="posts" id={songId} redirect={`/foods/${id}/ingredients`}>
            <SimpleForm>
                <TextInput source="name" />
            </SimpleForm>
        </Edit>
    );
};
