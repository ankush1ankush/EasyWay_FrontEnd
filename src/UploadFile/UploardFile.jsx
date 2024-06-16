import React, { useState, useEffect, useContext } from 'react';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { AppContext } from '../Storage/Storage';
import  { storage } from '../firebase'
import './UloardFile.css'
import FileCard from './FileCard';

const UploadFile =(props)=>{
    //console.log(props)
    const {user} = useContext(AppContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileSelect = (e) =>{
      e.preventDefault();
      setSelectedFile(e?.target?.files[0])
    }
    const [files,setFiles] = useState([]);
    useEffect( ()=>{
         
        const getfile = async () => {
            const url = `${process.env.REACT_APP_API_URL}/submit/getAllFiles`;
            const response = await fetch(url, {
                method: "POST",
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    client_id : user._id
                })
            })
            if(response.ok)
            {
               const data = await response.json();
               setFiles(data.Documents)
            }
            else{
                const result= await response.json();
                alert(result.message);
            }
        } 
        getfile() ;
            
    },[user]);
    const handleSubmit= async (event)=>{
        event.preventDefault()
        try{
          const fileName = selectedFile?.name;
          console.log(selectedFile.type);
        // pending catches
        const imageRef = ref(storage, `files/${fileName}`)
        
        const result = await uploadBytes(imageRef, selectedFile);
        const url = await getDownloadURL(result.ref)
        const backendUrl = `${process.env.REACT_APP_API_URL}/submit/addFile`
        const response = await fetch(backendUrl, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    client_id:props.client_id,
                    download_link: url,
                    file_type: selectedFile?.type,
                    file_name: selectedFile?.name,
                    })
                })
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            alert("Uploaded Successfully");
            setSelectedFile(null)
            
            setFiles(data.Documents);
            if (!response.ok) {
                const result = await response.json();
                //console.log(result);
                alert(result.message);
            }
            
        }
        catch(error){

        }
    };

    //console.log(uploadurl);

    return (

        <div >
         <form className="upload" onSubmit={handleSubmit}>
         <div className='file-input'>
        <input type='file' onChange={handleFileSelect} />
        <span className='button'>Choose</span>
        <span className='label' data-js-label><label>{selectedFile?.name?selectedFile.name:"No File selected"}</label></span>
        </div>
        <button className='fileButton' type="submit">SUBMIT</button>
         </form>
         <div className='upload__file__grid'>
            {console.log(files)};
            { 
            
              files.map((d) => {
                
                return (
                  <>
                   
                  <FileCard  key={d} data={d} setFiles = {setFiles} />
                  </>
                )
              })
            }
              
         </div>
        </div>
    )
    

}

export default UploadFile;
