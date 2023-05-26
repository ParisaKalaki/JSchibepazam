
import { List, Datagrid, TextField, useRecordContext,Link} from 'react-admin';
import { useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { EditSharp } from "@mui/icons-material";

export const IngredientList = () => {
    const { id } = useParams();
    return (
        <List resource="ingredients" >
            <Datagrid rowClick="edit">
                <TextField source="name" />
                <EditIngredientButton />
            </Datagrid>
        </List>
    );
};

const EditIngredientButton = () => {
    const ingredient = useRecordContext();
    return (
        <Button
            component={Link}
            to={`/foods/${ingredient?.ingredient_id}/ingredients/${ingredient?.id}`}
            startIcon={<EditSharp />}
        >
            Edit
        </Button>
    );
};
