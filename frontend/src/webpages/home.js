import React, { useCallback, useState, useEffect } from 'react'
import { ReactTags } from 'react-tag-autocomplete'
import '../home.css'; // import the CSS file
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [ingredients, setIngredients] = useState([]); // state to store the fetched ingredients
  const [foods, setFoods] = useState([]);


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
          event.preventDefault();
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
          })
          .catch(error => {
            // Handle error
            console.error(error)
          });
        };
 
  return (
    <>
      <h1> Select the ingredients:</h1>
      <div className='tag-bar-container'>
      <ReactTags
        labelText="Select countries"
        selected={selectedIngredients}
        suggestions={suggestions}
        onAdd={onAdd}
        onDelete={onDelete}
        noOptionsText="No matching countries" />
        
        <button className="submit-button" onClick={handleClick} type="button" >
          Search
          </button>
        </div>
 </>
    
  )
}
export default Home;
////////////////////////////////////////////////////////////////////
// import React, { useState, useEffect }  from 'react';
// import '../home.css'; // import the CSS file
// // import { useNavigate } from 'react-router-dom';
// // import { FaSearch } from 'react-icons/fa'
// import { ReactSearchAutocomplete } from 'react-search-autocomplete'
// import { TagInput } from 'react-tag-input';

// const Home = () => {
//   const [ingredients, setIngredients] = useState([]); // state to store the fetched ingredients
//   const [tags, setTags] = useState([]);

    
//     useEffect(() => {
//         // Fetch ingredients from API
//         const fetchIngredients = async () => {
//           try {
//             const response = await fetch('http://localhost:3000/api/v1/ingredients');
//             const data = await response.json();
//             setIngredients(data);
//           } catch (error) {
//             console.error('Error fetching ingredients:', error);
//           }
//         };
//         fetchIngredients();
//         console.log(ingredients);
        
//       }, []);


//   const handleOnSearch = (string, results) => {
  
//     // onSearch will have as the first callback parameter
//     // the string searched and for the second the results.
//     console.log(string, results)
//   }

//   const handleOnHover = (result) => {
//     // the item hovered
//     console.log(result)
//   }

//   const handleOnSelect = (item) => {
//     // the item selected
//     console.log(item)
//   }

//   const handleOnFocus = () => {
//     console.log('Focused')
//   }

//   const formatResult = (item) => {
//     return (
//       <>
//          <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
//       </>
//     )
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <div style={{ width: 400 }}>
//           <ReactSearchAutocomplete
//             items={ingredients}
//             onSearch={handleOnSearch}
//             onHover={handleOnHover}
//             onSelect={handleOnSelect}
//             onFocus={handleOnFocus}
//             autoFocus
//             formatResult={formatResult}
//           />
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Home;
//////////////////////////////////////////////////////////////
// const Home = () => {
//     const [ingredients, setIngredients] = useState([]); // state to store the fetched ingredients
//     const [selectedIngredients, setSelectedIngredients] = useState([]);  // state to store the selected ingredients


    
//     useEffect(() => {
//         // Fetch ingredients from API
//         const fetchIngredients = async () => {
//           try {
//             const response = await fetch('http://localhost:3000/api/v1/ingredients');
//             const data = await response.json();
//             setIngredients(data);
//           } catch (error) {
//             console.error('Error fetching ingredients:', error);
//           }
//         };
//         fetchIngredients();
        
//       }, []);
      
      
//         // Handle checkbox change event
//         const handleCheckboxChange = (event, ingredientId) => {
//           if (event.target.checked) {
//             // Add ingredientId to selectedIngredients array if checked
//             setSelectedIngredients([...selectedIngredients, ingredientId]);
//           } else {
//             // Remove ingredientId from selectedIngredients array if unchecked
//             setSelectedIngredients(selectedIngredients.filter(id => id !== ingredientId));
//           }
//         };
//         const [foods, setFoods] = useState([]);

//         // Handle form submit
//         const handleSubmit = (event) => {
//           event.preventDefault();
//           // Make API request to backend with selected ingredient IDs
//           fetch('http://localhost:3000/api/v1/foods/foodingredient', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },

//             body: JSON.stringify({ ingredientIds: selectedIngredients }),
//           })
//           .then(response => response.json())
//           .then(data => {
//             // Handle response data from backend
//             // Update component state with fetched data
//             setFoods(data);

//           })
//           .catch(error => {
//             // Handle error
//           });

//         };

//         const[input, setInput] = useState("");
//         const navigate = useNavigate();
//         const submitHandler =(e) => preventDefault();
//         navigate('/searched/' + input);
//         setInput("")
   

//       return (
//         <div className="container">
//            <form onSubmit={submitHandler} >
//         <div>
//             <FaSearch></FaSearch>
//             <input onChange={(e)=>{setInput(e.target.value)}} type="text" value={input} placeholder="Search recipe..."/>
//         </div>
//             </form>
//         <h2 className="title">Ingredients:</h2>
//         <form className="form" onSubmit={handleSubmit}>
//           {ingredients.map((ingredient) => (
//             <div key={ingredient.id} className="form__group">
//               <label className="form__label">
//                 <input
//                   className="form__checkbox"
//                   type="checkbox"
//                   value={ingredient.id}
//                   checked={selectedIngredients.includes(ingredient.id)}
//                   onChange={(event) => handleCheckboxChange(event, ingredient.id)}
//                 />
//                 <span className="form__text">{ingredient.name}</span>
//               </label>
//             </div>
//           ))}
//           <button className="button" type="submit">
//             Submit
//           </button>
//         </form>
//         {foods.length > 0 && (
//           <div className="matching-foods">
//             <h2 className="matching-foods__title">Matching Foods:</h2>
//             <ul className="matching-foods__list">
//               {foods.map((food) => (
//                 <li key={food.id} className="matching-foods__item">
//                   {food.name}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     );
//   };
  
//     export default Home;

