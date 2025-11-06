import { NextFunction, Response } from "express";
import { ResponseType } from "../types/request-response-type";
import jwt from "jsonwebtoken";
import { Payload } from "../types/payload";
import { AuthRequest } from "../types/request-auth";

const AuthMiddleware = (role: 'admin' | 'customer') => (req: AuthRequest, res: Response<ResponseType<null>>, next: NextFunction) => {
    try {
        // get token form cookies
        const token = req.cookies?.token as string;


        // cek token 
        if (!token) {
            return res.status(401).json({
                status: "failed",
                message: "Unauthorized not token",
                data: null
            });
        }

        // get payload 
        const payload = jwt.verify(token, process.env.SECRET_KEY || "") as Payload;


        // cek with switch case
        switch (role) {
            case 'admin':
                if (payload.role !== 'admin') {
                    return res.status(401).json({
                        status: "failed",
                        message: "Unauthorized admin",
                        data: null
                    });
                }
                break;
            case 'customer':
                if (payload.role !== 'customer') {
                    return res.status(401).json({
                        status: "failed",
                        message: "Unauthorized customer",
                        data: null
                    });
                }
                break;
            default:
                return res.status(401).json({
                    status: "failed",
                    message: "Unauthorized",
                    data: null
                });
        }

        // set req data 
        req.data = {
            id: payload.id,
            name: payload.name,
            email: payload.email,
            role: payload.role
        }

        // next
        next();



    } catch (error) {
        console.log(error);
        return res.status(401).json({
            status: "failed",
            message: "Unauthorized error",
            data: null
        });
    }
};


// export default AuthMiddleware;
export default AuthMiddleware;