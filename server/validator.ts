export const userNameValidator=(userName:string):boolean=>{
    if (userName.length<3) {
        throw new Error(` '${userName}'  is not a valid use Name.User name length must be gater then 2`);
    }
return true;
}

export const emailValidator=(email:string):boolean=>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        throw new Error(` '${email}'  is not a valid email`);
    }
   return true;   
}

export const phoneNumberValidator=(phoneNumber:string):boolean=>{
    const phoneNumberRegex =/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
if (!phoneNumberRegex.test(phoneNumber)) {
    throw new Error(` '${phoneNumber}'  is not a valid phone number`)
}
    return true;
}

export const PasswordValidator=(Password:string )=>{
    const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d#@$!%*?&]{6,}$/;
    if (!passwordRegex.test(Password)) {
        throw new Error(` '${Password}'  is not a valid password`)
    }
    return true;
}