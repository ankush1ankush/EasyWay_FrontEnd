import React from 'react'
import { ref, deleteObject} from 'firebase/storage';
import DeleteIcon from '@mui/icons-material/Delete';
import db, { storage  } from '../firebase'
import './UloardFile.css'
function FileCard(props) {
  const {data} = props;
  const handleClick = ()=>{
     const desertRef=  ref(storage, `files/${data?.file_name}`)
     deleteObject(desertRef).then(async () => {
  // File deleted successfully
     const backendUrl = `${process.env.REACT_APP_API_URL}/submit/deleteFile`
     const response = await fetch(backendUrl, {
                      method: 'POST',
                      credentials: 'include',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        client_id:props.client_id,
                        data:data,
                      })
                    });
                    if (!response.ok) {
                    throw new Error('Network response was not ok');
                    }
                    
                    alert("File deleted Successfully");
                    await props?.getUser();
     }).catch((error) => {
        console.log(error)
     });
  }
  return (
    <div className='fileCard'>
        <h3 className='fileCard__heading'>{data?.file_name}</h3> 
        <div className="file_delete">
        <DeleteIcon onClick={handleClick} />
        </div>
        <button className='fileCard__button'> <a download href={data?.download_link}>Download</a></button>
    </div>
  )
}

export default FileCard
