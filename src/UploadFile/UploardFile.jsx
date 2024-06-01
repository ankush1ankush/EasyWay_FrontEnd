import React, { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL} from 'firebase/storage';

import  { storage } from '../firebase'
import './UloardFile.css'
import FileCard from './FileCard';

const UploadFile =(props)=>{
    //console.log(props)
    
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileSelect = (e) =>{
      e.preventDefault();
      setSelectedFile(e?.target?.files[0])
    }
    const [files,setFiles] =useState([]);
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
                    client_id : props?.client_id
                })
            })
            if(response.ok)
            {
               const data = await response.json();
               console.log(data)
               setFiles(data.Document)
            }
            else{
                const result= await response.json();
                console.log(result);
                setFiles(result?.Document)
                alert(result.message);
            }
        } 
        getfile() ;
            
    },[]);
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
            setFiles(data.client?.Document);
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
         <form onsubmit="return false" className="upload"onSubmit={handleSubmit}>
         <div className='file-input'>
        <input type='file' onChange={handleFileSelect} />
        <span className='button'>Choose</span>
        <span className='label' data-js-label><label>{selectedFile?.name?selectedFile.name:"No File selected"}</label></span>
        </div>
        <button className='fileButton' type="submit">SUBMIT</button>
         </form>
         <div className='upload__file__grid'>
            {
              files?.map((d) => {
                console.log(d);
                return (
                 
                  <FileCard client_id={props.client_id}  data={d} getUser={props?.getUser} />
                )
              })
            }
              
         </div>
        </div>
    )
    

}

export default UploadFile;
