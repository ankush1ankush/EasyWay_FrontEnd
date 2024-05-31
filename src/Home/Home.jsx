import React, { useState } from "react";
import Note from "../Note/Note";
import CreateArea from "./CreateArea";



function Home(props){




  


return(

<div>

<CreateArea User={props.User} onAdd={props?.getUser()} />
      {props?.notes.map((noteItem, index) => {
        return (
         
          <Note
            key={index}
            id={noteItem._id}//replace it with note id
            title={noteItem.title}
            client_id={props.User._id}
            content={noteItem.content}
            getUser={props?.getUser()}
          />
         
        );
      })}
      
</div>

 )


}


export default Home;