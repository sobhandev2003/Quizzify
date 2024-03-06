import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"


const EmailVerification = () => {

    const { userId, VerificationToken } = useParams();
    const [verificationStatus, setVerificationStatus] = useState(false);
    const [verificationfedback, setVerificationfedback] = useState("");
    const requestToVerify = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/verify-email/${userId}/${VerificationToken}`);
            const data = await response.json()
            console.log(data);
            if (response.ok) {
                setVerificationStatus(data.success);
                setVerificationfedback(data.message);
            }
            else {
                setVerificationStatus(false);
                setVerificationfedback(data.message);
            }
        } catch (error) {
            console.error(error);

        }
    }
    useEffect(() => {
        requestToVerify();
    }, [userId, VerificationToken])


    return <div>
        {verificationStatus ? <><h1>{userId}</h1>
            <h2>{VerificationToken}</h2>
            <h3>{verificationfedback}</h3>
        </>
            :
            <><h1>Not Found</h1></>}
    </div>
}

export default EmailVerification