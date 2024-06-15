import React, { useEffect,useContext} from "react";
import Header from  "./Header/Header"
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import Register from "./Register/Register";
//import UploadImage from "./UploadImage/UploadImage";
import UploadFile from "./UploadFile/UploardFile"
import {AppContext} from "./Storage/Storage" 
import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login/login";

function App() {

  const {getUser, user}=useContext(AppContext);
  

  useEffect( ()=>{
    getUser();
  },[getUser])

  return (
    <>
    <div className="App">
      
      <Header  User={user} />    
      <Routes>
        
          <Route path="/"  element={user?<Home/>:<Login/>}/>
          <Route path="/register"  element={user?<Navigate to='/'/>:<Register />}/>
          <Route path="/uploadFile"  element={user?<UploadFile client_id={user._id} />:<Navigate to='/'/>}/>
          
      </Routes>
      
    </div>
      <Footer/>
      </>
  );
}

export default App;
