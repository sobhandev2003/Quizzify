import { useState } from "react";
import { useParams } from "react-router-dom";


const ResetPassword = () => {
    const {userId ,VerificationToken}=useParams();
    const [password,setPassword]=useState("");
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
    };
    const handelFormSubmit=async(e:React.FormEvent)=>{
        e.preventDefault();
        const requestBody={userId:userId||""
            ,VerificationToken:VerificationToken || ""
            ,newPassword:password || ""};
        const jsonBody=  JSON.stringify(requestBody);
        
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/reset-password`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: jsonBody
          });
            const data=await response.json();
            console.log(data);
            
      }
  return <div>
    <form onSubmit={handelFormSubmit}>
        <input type="text" minLength={6} onChange={handlePasswordInput} required/>
        <button type="submit">Reset Password</button>
    </form>
  </div>
}

export default ResetPassword