import React from 'react';
import '../foodCard.css'; // import the CSS file
// import * as dotenv from 'dotenv'

// dotenv.config()
const FoodCard = ({ food }) => {
const { id, name, Ingredients, image } = food;
const s3baseurl = process.env.REACT_APP_S3_BASE_URL

let ing = Ingredients.map((x,index) =>   (index ? ', ': '') + x.name );
let img = s3baseurl + image
  return (
    <div className="food-card">
      <img src={img} className='food-img' />
      <h3>{name}</h3>
      <h4>Ingredients:</h4>
      <p>{ing}</p>
    </div>
  );
};

export default FoodCard;
