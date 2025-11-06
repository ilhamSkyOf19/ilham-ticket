import { NextFunction, Response } from "express";
import { Payload } from "../types/payload";
import { AuthRequest } from "../types/request-auth";
import { ResponseType } from "../types/request-response-type";
import { AuthService } from "../services/auth.service";
import { LoginRequest, toAuthResponse } from "../models/auth-model";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export class AuthController {
    // login 
    static async login(req: AuthRequest<{}, {}, LoginRequest>, res: Response<ResponseType<Payload | null>>, next: NextFunction) {
        try {
            // get body form req
            const body = req.body;

            // user with email 
            const user = await AuthService.checkUser(body.email);

            // cek user 
            if (!user) {
                return res.status(404).json({
                    status: "failed",
                    message: "Email or password invalid",
                    data: null
                });
            }


            // cek password
            const passwordCompare = await bcrypt.compare(
                body.password,
                user?.password as string
            );

            // cek password
            if (!passwordCompare) {
                return res.status(401).json({
                    status: "failed",
                    message: "Email or password invalid",
                    data: null
                });
            }

            // generate token 
            const token = jsonwebtoken.sign(
                {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                },
                process.env.SECRET_KEY as string,
                { expiresIn: '1d' }
            );


            // set cookie
            res.cookie('token', token, {
                httpOnly: false,
                secure: true,
                sameSite: 'none'
            })


            // return response
            return res.status(200).json({
                status: "success",
                message: "Login successful",
                data: toAuthResponse({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                })
            });


        } catch (error) {
            // next error
            next(error);
        }
    }
}

