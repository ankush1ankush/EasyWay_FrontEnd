import React, { useState,useContext } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import "./CreateArea.css";
import { AppContext } from "../Storage/Storage";

function CreateArea() {
  const [isExpanded, setExpanded] = useState(false);
  const { getUser, user } = useContext(AppContext)
 
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  async function submitNote(event) {
    event.preventDefault();
    setNote({
      title: "",
      content: ""
    });
    await ADDdata();
  }

  function expand() {
    setExpanded(true);
  }


  
  const ADDdata = async () => {
    const url = `${process.env.REACT_APP_API_URL}/submit/addNote`;
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: note.title,
          content: note.content,
          clientId: user._id
        })
      });
      

      

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await getUser();
      console.log(user)
    } catch (error) {
      console.error('Fetch error:', error);
    }
	};


  return (
    <div className="create-note">
      <form  >
        {isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
