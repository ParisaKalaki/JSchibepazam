import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";
import Main from './Main';
import Food from './food/Food';
const Webpages = () => {
    return(
        <React.StrictMode>
        <Routes>
            <Route exact path="/" element= {<Main/>} />
            <Route path = "/food" element = {<Food/>} />
        </Routes>
        </React.StrictMode>
        
    );
};
export default Webpages;
