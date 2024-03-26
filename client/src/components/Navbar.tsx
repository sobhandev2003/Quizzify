import "../css/Navbar.css";
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { logoutLoginUser } from "../services/userAcoount";
import { isMobile } from 'react-device-detect';
import { Link } from "react-router-dom";
import { drivePhotoBaseUrl } from "../App";
import { UserDetails } from "../redux/reducer/userAccount";
function Navbar() {
  const [isLogin, setIsLogin] = useState<Boolean>(false)
  const [profilePhotoId, setProfilePhotId] = useState("16ZNm23QEmM4isLF7Rvfv8CPQpipsvAbe")
  const [isProfileDetails, setIsProfileDetails] = useState(false)
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logOutAccount = () => {
    logoutLoginUser(dispatch, navigate)
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
      {
        isLogin ? (
          <div className="after-login">
            <div className="logo-div">
              <Link to="/">
                <img src={`${drivePhotoBaseUrl}1Sx55Q0riatzqgISY51ZCbrsGcT4Zlmk3`} alt="logo" className="logo" />
              </Link>
            </div>
            {!isMobile ? (
              <>
                <div className="profile-details">
                  <img src={`${drivePhotoBaseUrl}${profilePhotoId}`} alt="profile photo" className="profile-photo" onClick={() => setIsProfileDetails(!isProfileDetails)} />

                  {
                    isProfileDetails &&
                    <div className="details-section">
                      <NavLink to={`/${userDetails.userName}`} className="user-basic-details">
                      <img src={`${drivePhotoBaseUrl}${profilePhotoId}`} alt="profile photo" className="user-photo"/>
                      <div>
                      <h3>{userDetails.userName}</h3>
                      <h4>{userDetails.email}</h4>
                      </div>
                      </NavLink>

                      <button onClick={logOutAccount}>Log out</button>

                    </div>
                  }
                </div>

              </>
            ) : (
              <>

              </>
            )}
          </div>)

          : (<div className="before-login">
            <NavLink to="register">Register</NavLink>
            <NavLink to="login">Login</NavLink>

          </div>)

      }
    </div>
  )
}

export default Navbar