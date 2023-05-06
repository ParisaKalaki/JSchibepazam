import React from 'react';
import { useLocation } from 'react-router-dom';
import FoodCard from './foodCard';
import '../foodCard.css'; // import the CSS file


const Food = () => {
     const location = useLocation();
     const { foods } = location.state;
     const cards = foods.map(food => {
      console.log(food.Ingredients)
      return (
        <FoodCard key={food.id} food={food} Ingredients={food.Ingredients} image={food.image} />
      )
  })        
    return (
      <section className="cards-list">
      {cards}
     </section>
       
      );
}
export default Food;
