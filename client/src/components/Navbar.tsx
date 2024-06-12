import "../css/Navbar.css";
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../redux/store";
import { logoutLoginUser } from "../services/userAcoount";
import { isMobile } from 'react-device-detect';
import { Link } from "react-router-dom";
import { drivePhotoBaseUrl } from "../App";
import { UserDetails } from "../redux/reducer/userAccount";
import Avatar from "react-avatar"
function Navbar() {
  const [isLogin, setIsLogin] = useState<Boolean>(false)
  const [profilePhotoId, setProfilePhotId] = useState<string | null>(null)
  const [isProfileDetails, setIsProfileDetails] = useState(false)
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

  //NOTE - 


  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logOutAccount = () => {
    dispatch(logoutLoginUser(navigate))
  }



  useEffect(() => {
    if (LoginDetails.email.length > 0) {
      setIsLogin(true);
      setUserDetails(LoginDetails)
      // console.log(LoginDetails);

      if (LoginDetails.profilePhotoId.length > 0) {
        setProfilePhotId(LoginDetails.profilePhotoId)
      }
    }
    else {
      setIsLogin(false);
    }

  }, [LoginDetails])


  return (
    <div className="navbar">
      <div className="logo-div">
        <Link to="/">
          <img src={`${drivePhotoBaseUrl}1Sx55Q0riatzqgISY51ZCbrsGcT4Zlmk3`} alt="logo" className="logo" />
        </Link>
      </div>
      {
        isLogin ? (
          <div className="after-login">
            {!isMobile ? (
              <>

                <div className="profile-details">
                  {profilePhotoId ? <img src={`${drivePhotoBaseUrl}${profilePhotoId}`} alt="profile photo" className="profile-photo" onClick={() => setIsProfileDetails(!isProfileDetails)} /> : <Avatar name={userDetails.userName} className="profile-photo" onClick={() => setIsProfileDetails(!isProfileDetails)} />}


                  {
                    isProfileDetails &&
                    <div className="details-section">
                      <NavLink to={`/${userDetails.userName}`} className="user-basic-details">
                        {/* <img src={`${drivePhotoBaseUrl}${profilePhotoId}`} alt="profile photo" className="user-photo" /> */}
                        {profilePhotoId ? <img src={`${drivePhotoBaseUrl}${profilePhotoId}`} alt="profile photo" className="user-photo" /> : <Avatar name={userDetails.userName} className="profile-photo" />}

                        <div>
                          <h3>{userDetails.userName}</h3>
                          <h4>{userDetails.email}</h4>
                        </div>
                      </NavLink>
                      <div>
                        <NavLink to="/quiz/create">Create Quiz</NavLink>
                        <NavLink to="/quiz/my-quiz">My Quiz</NavLink>
                        <button onClick={logOutAccount}>Log out</button>
                      </div>
                    </div>
                  }
                </div>

              </>
            ) : (
              <>

              </>
            )}
          </div>)

          : (<></>)

      }
    </div>
  )
}

export default Navbar