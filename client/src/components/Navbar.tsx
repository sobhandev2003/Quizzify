import  "../css/Navbar.css";
import { useState } from "react"
import { NavLink } from "react-router-dom"


function Navbar() {
    const [isLogin,setIsLogin]=useState<Boolean>(false)
  return (
    <div className="navbar">
        {
            isLogin?(<div>

            </div>)
            :(<div className="before-login">
            <NavLink to="register">Register</NavLink>
            <NavLink to="login">Login</NavLink>
            
            </div>)

        }
    </div>
  )
}

export default Navbar