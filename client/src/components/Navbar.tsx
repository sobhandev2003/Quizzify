import "../css/Navbar.css";
import { useEffect, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAppSelector } from "../redux/store";
import { useDispatch } from "react-redux";
import { logoutLoginUser } from "../services/userAcoount";


function Navbar() {
  const [isLogin, setIsLogin] = useState<Boolean>(false)
  const LoginDetails = useAppSelector(state => state.userAccountReducer.loginUser);
  const dispatch = useDispatch();
const navigate=useNavigate();
  const logOutAccount = () => {
    logoutLoginUser(dispatch,navigate)
  }

  useEffect(() => {
    if (LoginDetails.email.length > 0) {
      setIsLogin(true);
    }
    else{
      setIsLogin(false);
    }
    
  }, [LoginDetails])
  return (
    <div className="navbar">
      {
        isLogin ? (<div>
          <NavLink to="/">Home</NavLink>
          <button onClick={logOutAccount}>Log out</button>
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