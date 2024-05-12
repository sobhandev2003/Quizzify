import React, { useEffect, useState } from 'react'
import { updateProfilePhoto } from '../services/userAcoount';
import toast from 'react-hot-toast';
import { UserDetails } from '../redux/reducer/userAccount';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { drivePhotoBaseUrl } from '../App';
import PreviousAttendQuizDetails from '../components/PreviousAttendQuizDetails';

function Profile() {
  const dispatch = useAppDispatch()
  const [photo, setPhoto] = useState<File | null>(null)
  //NOTE - User basic details
  const [userDetails, setUserDetails] = useState<UserDetails>(
    {
      id: "",
      email: "",
      userName: "",
      phoneNumber: "",
      profilePhotoId: "",
      AttendQuizzes: []
    }
  )

  const LoginDetails = useAppSelector(state => state.userAccountReducer.loginUser);
  //NOTE - Handel profile photo change request
  const handelUpdateProfilePhoto = (e: React.FormEvent) => {
    e.preventDefault()
    if (photo) {
      dispatch(updateProfilePhoto(photo))
      // console.log(photo);

    }
    else {
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
  const profilePhotoChangeFrom = (
    <form onSubmit={handelUpdateProfilePhoto}>
      <input type="file" name="photo" onChange={handelInputChange} required />
      <button type='submit' >Update</button>

    </form>
  )

  useEffect(() => {
    if (LoginDetails.email.length > 0) {
      setUserDetails(LoginDetails);
    }
  }, [LoginDetails])


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
        <table>
          <thead>
            <tr>
             
                
                <th>Quiz ID</th>
                <th>Quiz Name</th>
                <th>Quiz Category</th>
                <th>Score</th>
                <th>Passed</th>
              
            </tr>
          </thead>
          <tbody>
          {
          userDetails.AttendQuizzes && userDetails.AttendQuizzes.map((quizDetails,index) => (
            <PreviousAttendQuizDetails key={index} quizDetails={quizDetails} />
          ))
        }
          </tbody>
        </table>
       
      </div>


    </div>
  )
}

export default Profile