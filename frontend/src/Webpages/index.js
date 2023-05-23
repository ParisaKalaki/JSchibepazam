import React from 'react';
import {
  BrowserRouter,
  RouterProvider,
  Switch,
  Route,
  Link,
  Routes,
  Navigate
} from "react-router-dom";
import Main from './Main';
import Food from './food/Food';
import Login, { loader as loginLoader } from "./login/Login"
import RequireAuth from "./login/RequireAuth.js"
import Layout from './Layout';


const Webpages = () => {
    return(
        <React.StrictMode>
        <Routes>
            <Route exact path="/" element= {<Main/>} />
            <Route path = "/food" element = {<Food/>} />
            <Route path="/login" element={<Login />}/>
            <Route path="/dashboard" element={
                            <RequireAuth>
                              <Layout/>
                            </RequireAuth>
                          }/>
            

            
        </Routes>
        </React.StrictMode>


        
        
    );
};
export default Webpages;
