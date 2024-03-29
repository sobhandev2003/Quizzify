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

export interface Quiz{
    Name:string;
    Description:string;
    Category:string;
    Topic?:string;
    NumberOfQuestion:string;
    TotalScore:string;
    NumberOfAttendByAnyone?:string;
    PassingScore?:string;
    poster?:File|null;
}