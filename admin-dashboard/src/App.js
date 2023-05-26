import * as React from "react";
import { Admin, Resource, ListGuesser, CustomRoutes } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import {dataProvider} from "./dataProvider";
import { Layout } from 'react-admin';
import { ReactQueryDevtools } from 'react-query/devtools';
import { FoodCreate, FoodEdit, FoodList, FIEdit } from './foods';
import { Route } from 'react-router-dom';
import { IngredientCreate, IngredientEdit } from "./ingredients"
import { IngredientList } from "./ingredientList "
import { IngredientDetail } from "./ingredientsDetail"

//<Route path=":foodId/ingredients/:ingredientId" element={<IngredientDetail />} />
// <Resource name="ingredients" list={IngredientList} create={IngredientCreate} edit={IngredientEdit} /> 
export const MyLayout = props => (
    <>
        <Layout {...props} />
        <ReactQueryDevtools initialIsOpen={false} />
    </>
);
const App = () => (
    <Admin dataProvider={dataProvider} layout={MyLayout}> 
        <Resource name="foods" list={FoodList} create={FoodCreate} edit={FoodEdit} />
        <Resource name="ingredients" list={IngredientList} create={IngredientCreate} edit={IngredientEdit} /> 


       
        
        
         
    </Admin>
);

export default App;
{/* <Route path=":id/ingredients" element={<IngredientList />} />
<Route path=":id/ingredients/:ingredientId" element={<IngredientDetail />} />
</Resource> */}
