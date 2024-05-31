import React, { useEffect, useState } from "react";
import Header from  "./Header/Header"
import Footer from "./Footer/Footer";
import Home from "./Home/Home";
import Register from "./Register/Register";
//import UploadImage from "./UploadImage/UploadImage";
import UploadFile from "./UploadFile/UploardFile"
import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login/login";

function App() {

  
  const [user, setUser] = useState(null);
  
  const [notes, setNotes] = useState([]);
  const [files,setFiles] = useState([]);
  const getUser = async () => {
    const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          // 'Content-Type' header is not necessary for a GET request
        },
      });
    
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    
      const data = await response.json(); 
      //console.log(data.user);
      if(data?.user){
      setUser(data.user);
      setNotes(user.notes);
      setFiles(user?.Document)
      }
     // console.log(user)f
    } catch (error) {
      console.error('Fetch error:', error);
    }
	};

  useEffect(()=>{
  getUser();
  },[]);

  return (
    <>
    <div className="App">
      
      <Header  User={user} />    
      <Routes>
        
          <Route path="/"  element={user?<Home User={user} notes={notes} getUser={getUser}/>:<Navigate to="/login"/>}/>
          <Route path="/login"  element={user?<Navigate to="/"/>:<Login getUser={getUser}/>}/>
          <Route path="/register"  element={user?<Navigate to='/'/>:<Register getUser={getUser}/>}/>
          <Route path="/uploadFile"  element={user?<UploadFile client_id={user._id} files={files} getUser={getUser} />:<Navigate to='/'/>}/>
          
      </Routes>
      
    </div>
      <Footer/>
      </>
  );
}

export default App;
