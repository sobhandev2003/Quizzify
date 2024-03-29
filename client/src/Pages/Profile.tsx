import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateProfilePhoto } from '../services/userAcoount';
import toast from 'react-hot-toast';
import { UserDetails } from '../redux/reducer/userAccount';
import { useAppSelector } from '../redux/store';
import { drivePhotoBaseUrl } from '../App';

function Profile() {
  const dispatch = useDispatch()
  const [photo, setPhoto] = useState<File | null>(null)
  //NOTE - User basic details
  const [userDetails, setUserDetails] = useState<UserDetails>(
    {
      id: "",
      email: "",
      userName: "",
      phoneNumber: "",
      profilePhotoId: ""
    }
  )

  const LoginDetails = useAppSelector(state => state.userAccountReducer.loginUser);
//NOTE - Handel profile photo change request
  const handelUpdateProfilePhoto = (e:React.FormEvent) => {
    e.preventDefault()
    if (photo) {
      updateProfilePhoto(photo, dispatch)
    }
    else{
      toast.error("Photo is missing")      
    }
  }

  //NOTE -  Track change of profile photo change input
  const handelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setPhoto(selectedFile);
    }
  }
//NOTE - create from for change user profilePhoto
const profilePhotoChangeFrom=(
<form onSubmit={handelUpdateProfilePhoto}>
      <input type="file" name="photo" onChange={handelInputChange} required />
      <button type='submit' >Update</button>
      
      </form>
)

  useEffect(()=>{
    if (LoginDetails.email.length>0) {
      setUserDetails(LoginDetails);
    }
  },[LoginDetails])

  return (
    <div>
      {/* //NOTE -  input for change profile photo */}
      <div>
      {profilePhotoChangeFrom}
      </div>

    <div>
      <h3>{userDetails.userName}</h3>
      <h5>{userDetails.email}</h5>
      <img src={`${drivePhotoBaseUrl}${userDetails.profilePhotoId}`} alt="profile-photo" />
      {/* //TODO -  */}
    </div>
      

    </div>
  )
}

export default Profile