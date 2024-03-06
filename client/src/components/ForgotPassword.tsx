import { useState } from "react"


const ForgotPassword = () => {
const [email,setEmail]=useState("");

const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };
  console.log(import.meta.env.VITE_BASE_URL);
  const handelFormSubmit=async(e:React.FormEvent)=>{
    e.preventDefault();
   
    
    
        const response=await fetch(`${import.meta.env.VITE_BASE_URL}/users/forgot-password`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify({ email })
        })
        const data=await response.json()
        console.log(data);
        
  }


  return <div>
        <form onSubmit={handelFormSubmit}>
            <input type="email" name="email" onChange={handleEmailInput} required />
            <button type="submit">Send Link</button>
        </form>
  </div>
}

export default ForgotPassword