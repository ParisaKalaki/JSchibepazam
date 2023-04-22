import React, { useState, useEffect }  from 'react';
import '../home.css'; // import the CSS file


const Home = () => {
    const [ingredients, setIngredients] = useState([]); // state to store the fetched ingredients
 
    
    useEffect(() => {
        // Fetch ingredients from API
        const fetchIngredients = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/v1/ingredients');
            const data = await response.json();
            setIngredients(data);
          } catch (error) {
            console.error('Error fetching ingredients:', error);
          }
        };
        fetchIngredients();
      }, []);
      
        const [selectedIngredients, setSelectedIngredients] = useState([]);  // state to store the selected ingredients
      
        // Handle checkbox change event
        const handleCheckboxChange = (event, ingredientId) => {
          if (event.target.checked) {
            // Add ingredientId to selectedIngredients array if checked
            setSelectedIngredients([...selectedIngredients, ingredientId]);
          } else {
            // Remove ingredientId from selectedIngredients array if unchecked
            setSelectedIngredients(selectedIngredients.filter(id => id !== ingredientId));
          }
        };
        const [foods, setFoods] = useState([]);

        // Handle form submit
        const handleSubmit = (event) => {
          event.preventDefault();
          // Make API request to backend with selected ingredient IDs
          fetch('http://localhost:3000/api/v1/foods/foodingredient', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },

            body: JSON.stringify({ ingredientIds: selectedIngredients }),
          })
          .then(response => response.json())
          .then(data => {
            // Handle response data from backend
            // Update component state with fetched data
            setFoods(data);

          })
          .catch(error => {
            // Handle error
          });
        };


      return (
        <div className="container">
        <h2 className="title">Ingredients:</h2>
        <form className="form" onSubmit={handleSubmit}>
          {ingredients.map((ingredient) => (
            <div key={ingredient.id} className="form__group">
              <label className="form__label">
                <input
                  className="form__checkbox"
                  type="checkbox"
                  value={ingredient.id}
                  checked={selectedIngredients.includes(ingredient.id)}
                  onChange={(event) => handleCheckboxChange(event, ingredient.id)}
                />
                <span className="form__text">{ingredient.name}</span>
              </label>
            </div>
          ))}
          <button className="button" type="submit">
            Submit
          </button>
        </form>
        {foods.length > 0 && (
          <div className="matching-foods">
            <h2 className="matching-foods__title">Matching Foods:</h2>
            <ul className="matching-foods__list">
              {foods.map((food) => (
                <li key={food.id} className="matching-foods__item">
                  {food.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };
  
    export default Home;
