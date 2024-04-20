import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";
export interface CustomRequest extends Request {
    user: {
        id: mongoose.Schema.Types.ObjectId,
        userName: String,
        email: String,
    },
    expireTime: Number
}

export interface PayloadInterface {
    user: {
        id: mongoose.Schema.Types.ObjectId,
        userName: String,
        email: String
    },
    expireTime: Number,
   
}
export const validation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token:string=req.cookies.authToken||""
        jwt.verify(token, process.env.JWT_SECRET!, (err, decode) => {
            if (err) {
                res.status(401);
                throw new Error("Authorization token not valid")
            }
        })
        //NOTE - now token is valid move forward  
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as PayloadInterface
        (req as CustomRequest).user = payload.user;
        (req as CustomRequest).expireTime = payload.expireTime;
        next()

    } catch (error) {
        res.status(401)
        next(error)
    }

} 