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
import { HiOutlineLogout } from "react-icons/hi";
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
      <div>
        {
          isLogin ? (
            <div className="after-login">
              {!isMobile ? (
                <>

                  <div className="profile-details">

                    <div className="profile-photo-container">
                      {profilePhotoId ? <img src={`${drivePhotoBaseUrl}${profilePhotoId}`} alt="profile photo" className="profile-photo" onClick={() => setIsProfileDetails(!isProfileDetails)} /> : <Avatar name={userDetails.userName} className="profile-photo" size="70" onClick={() => setIsProfileDetails(!isProfileDetails)} />}
                    </div>


                    {
                      isProfileDetails &&
                      <div className="details-section mt-2 rounded-2xl p-4 flex flex-col gap-4 items-start bg-slate-300">
                        <NavLink to={`/${userDetails.userName}`} className="user-basic-details">
                          {/* <img src={`${drivePhotoBaseUrl}${profilePhotoId}`} alt="profile photo" className="user-photo" /> */}
                          <div className="profile-photo-container">
                            {profilePhotoId ? <img src={`${drivePhotoBaseUrl}${profilePhotoId}`} alt="profile photo" className="profile-photo" onClick={() => setIsProfileDetails(!isProfileDetails)} /> : <Avatar name={userDetails.userName} className="profile-photo" size="70" onClick={() => setIsProfileDetails(!isProfileDetails)} />}
                          </div>

                          <div>
                            <h3>{userDetails.userName}</h3>
                            {/* <h4>{userDetails.email}</h4> */}
                          </div>
                        </NavLink>
                        <div className=" flex flex-wrap  items-start justify-around gap-2 ">
                          <NavLink className="bg-slate-100 h-20 w-28 p-2 flex items-center justify-center rounded-2xl" to="/quiz/create">Create Quiz</NavLink>
                          <NavLink className="bg-slate-100 h-20 w-28 p-2 flex items-center justify-center rounded-2xl" to="/quiz/my-quiz">My Quiz</NavLink>
                        </div>
                        <button className="flex items-center justify-center gap-1 text-lg text-red-700" onClick={logOutAccount}><HiOutlineLogout /> <span>Log out</span></button>
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
    </div>
  )
}

export default Navbar