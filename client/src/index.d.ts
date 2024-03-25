export interface UserRegisterDetails{
    UserName:string;
    Email:string
    phoneNumber:string
    Password:string
}

export interface LoginDetails{
    email:string,
    password:string
}

export type AuthAction = { 
    type: 'LOGIN_SUCCESS'; payload: any 
}
