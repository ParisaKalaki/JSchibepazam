import React, { useCallback, useState, useEffect } from 'react'
import { ReactTags } from 'react-tag-autocomplete'
import '../Main.css'; // import the CSS file
import { useNavigate } from "react-router-dom";
import Navbar from "./common/Navbar"


const Main = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [ingredients, setIngredients] = useState([]); // state to store the fetched ingredients
  const [foods, setFoods] = useState([]);


  useEffect(() => {
            // Fetch ingredients from API
            fetch('http://localhost:3000/api/v1/ingredients')
            .then(response => response.json())
            .then(data => {
              setIngredients(data);
            })
            .catch(error => {
              console.error('Error fetching ingredients:', error);
            });          
          }, []);

        const suggestions = ingredients.map(({ id, name }) => [
            {
              label: name,
              value: id,
            }
          ]).flat()
  
        const onAdd = useCallback(
          (newTag) => {
            setSelectedIngredients([...selectedIngredients, newTag])
          },
          [selectedIngredients]
        )

        const onDelete = useCallback(
          (tagIndex) => {
            setSelectedIngredients(selectedIngredients.filter((_, i) => i !== tagIndex))
          },
          [selectedIngredients]
        )
        const navigate = useNavigate();

        
        // Handle form submit
        const handleClick =  (event) =>  {

          const ingredient_ids = selectedIngredients.map(({value}) => value).flat(2)
          //event.preventDefault();
          if (ingredient_ids.length === 0) {
            console.log('No ingredients selected.');
            return;
          }
          // Make API request to backend with selected ingredient IDs
           fetch('http://localhost:3000/api/v1/foods/foodingredient', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({ ingredientIds: ingredient_ids }),
          })
          .then(response => response.json())
          .then(data => {
            // Handle response data from backend
            // Update component state with fetched data
            setFoods(data);
            navigate('/food', { state: { foods: data } });
            console.log(data)
          })
          .catch(error => {
            // Handle error
            console.error(error)
          });
        };
 
  return (
  <>
    <Navbar />
    <div className="main">
      <h1> Select the ingredients:</h1>
      <div className='tag-bar-container'>
      <ReactTags
        labelText="Select ingredients"
        selected={selectedIngredients}
        suggestions={suggestions}
        onAdd={onAdd}
        onDelete={onDelete}
        noOptionsText="No matching ingredinets" />
        
        <button className="submit-button" onClick={handleClick} type="button" >
          Search
          </button>
        </div>
 </div>
</>  
  )
}
export default Main;
