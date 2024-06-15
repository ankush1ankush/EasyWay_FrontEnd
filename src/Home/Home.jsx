import React, { useContext, useEffect, useState } from "react";
import Note from "../Note/Note";
import CreateArea from "./CreateArea";
import { AppContext } from "../Storage/Storage";


function Home(props){

const { user } = useContext(AppContext)
const [notes,setNote]=useState([]);
useEffect(()=>{
  setNote(user?.notes)
},[user])
return(

<div>

<CreateArea />
      {notes.map((noteItem, index) => {
        return (
         
          <Note
            key={index}
            id={noteItem._id}//replace it with note id
            title={noteItem.title}
            content={noteItem.content}
          />
         
        );
      })}
      
</div>

 )


}


export default Home;