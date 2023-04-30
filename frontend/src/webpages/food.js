import React from 'react';
import { useLocation } from 'react-router-dom';
import FoodCard from './foodCard';
import '../foodCard.css'; // import the CSS file


const Food = () => {
     const location = useLocation();
     const { foods } = location.state;
    return (
        <div className="foods-container">
        {foods.map((food) => (
          <FoodCard key={food.id} food={food} />
        ))}
      </div>
      );
}
export default Food;
