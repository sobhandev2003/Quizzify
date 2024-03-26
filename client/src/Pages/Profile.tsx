import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateProfilePhoto } from '../services/userAcoount';

function Profile() {
    const dispatch=useDispatch()
    const [photo,setPhoto]=useState<File|null>(null)
    const handelUpdateProfilePhoto=()=>{
            // console.log(photo);
            if(photo){
                updateProfilePhoto(photo,dispatch)
            }
    }
    const handelInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const files = e.target.files;
        if (files && files.length > 0) {
          const selectedFile = files[0];
          setPhoto(selectedFile);
        }
            
    }
  return (
    <div>
            <input type="file" name="photo" onChange={handelInputChange} />
                <button type='submit' onClick={handelUpdateProfilePhoto}>Update</button>

    </div>
  )
}

export default Profile