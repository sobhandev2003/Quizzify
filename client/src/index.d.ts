
export interface UserRegisterDetails {
    UserName: string;
    Email: string
    phoneNumber: string
    Password: string
}

export interface LoginDetails {
    email: string,
    password: string
}

export type AuthAction = {
    type: 'LOGIN_SUCCESS'; payload: any
}

export interface Quiz {
    Name: string;
    Description: string;
    Category: string;
    Topic?: string;
    NumberOfQuestion: string;
    TotalScore: string;
    NumberOfAttendByAnyone?: string;
    PassingScore?: string;
    poster?: File | null;
}

export interface Quiz {
    _id: string,
    User_Id: string;
    Name: string;
    Description: string;
    Category: string;
    Topic?: string;
    NumberOfQuestion: number;
    TotalScore: number;
    PassingScore?: number;
    NumberOfAttendByAnyone?: number;
    PosterId?: string | null;
    TotalNumberOfSubmit?: number;
    
    createdAt?: Date;
    updatedAt?: Date;
    isValid?: boolean;
    LikeBy?:string[];
    UnLikeBy?:string[]
}

export interface Option{
    A:string;
    B:string;
    C:string;
    D:string;
}

export interface QuestionType {
    _id?:string
    QuestionNumber:string;
    Question:string;
    Description: string;
    Option:Option;
    CorrectOption:string;
    Marks:number
}
export interface AttendQuizDetails{
        _id?:string
        Quiz_ID: string,
        Quiz_Name: string,
        Quiz_Category: string,
        Score: number,
        IsPassed:boolean
   
}

// const NavigateType=typeof useNavigate()