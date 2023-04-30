import React from 'react';
import '../foodCard.css'; // import the CSS file


const FoodCard = ({ food }) => {
const { id, name, description } = food;

  return (
    <div className="food-card">
      <h3>{name}</h3>
      <p>{description}</p>
      <p>ID: {id}</p>
    </div>
  );
};

export default FoodCard;
