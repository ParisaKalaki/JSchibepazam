import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Home from './Home';
import Food from './Food/Food';
const Webpages = () => {
    return(
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element= {<Home/>} />
            <Route path = "/food" element = {<Food/>} />
        </Routes>
        </BrowserRouter>
        
    );
};
export default Webpages;
