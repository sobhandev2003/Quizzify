import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
export interface CustomRequest extends Request {
    user: {
        id: String,
        userName: String,
        email: String,
    },
    expireTime: Number
}

export interface PayloadInterface {
    user: {
        id: '65e8b76084e7cba5697adfe8',
        userName: 'Sob',
        email: 'jonathan.wills@farmoaks.com'
    },
    expireTime: 864000000,
    iat: 1709816110,
    exp: 1710680110
}
export const validation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationToken = req.headers.authorization || req.headers.Authorization;
        
        
        if ( authorizationToken === undefined) {
             res.status(401)
            throw new Error("Authorization token is missing")
        }

        if (!authorizationToken.includes("Bearer")) {
            res.status(401)
            throw new Error("Authorization token not valid")
        }

        if (Array.isArray(authorizationToken)) {
            res.status(401)
            throw new Error("Authorization token not valid")
        }

        const token = authorizationToken.split(" ")[1];

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