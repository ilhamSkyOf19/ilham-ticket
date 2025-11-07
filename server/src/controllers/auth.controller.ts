import { NextFunction, Request, Response } from "express";
import { Payload } from "../types/payload";
import { AuthRequest } from "../types/request-auth";
import { ResponseType } from "../types/request-response-type";
import { AuthService } from "../services/auth.service";
import { LoginRequest, toAuthResponse } from "../models/auth-model";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { UserCreateType, UserResponseType } from "../models/user-model";
import { generateUrl } from "../helpers/helper";
import { UserService } from "../services/user.service";

export class AuthController {


    // cek auth 
    static async checkAuth(req: AuthRequest, res: Response<ResponseType<Payload | null>>, next: NextFunction) {
        try {

            // get payload 
            const payload = req.data as Payload;


            // cek user with email
            const user = await UserService.readWithIdAndEmail(payload.id, payload.email);

            // cek user
            if (!user) {
                return res.status(404).json({
                    status: 'failed',
                    message: 'User not found',
                    data: null
                });
            }

            // return
            return res.status(200).json({
                status: 'success',
                message: 'User found',
                data: toAuthResponse(user)
            })
        } catch (error) {

            // next error
            next(error)
        }
    }

    // register
    static async create(req: Request<{}, {}, UserCreateType>, res: Response<ResponseType<UserResponseType | null>>, next: NextFunction) {
        try {

            // get body 
            const body = req.body;

            // base url 
            const baseUrl = `${req.protocol}://${req.get("host")}`;


            // generate 
            const url_avatar = generateUrl(baseUrl, 'avatars', 'default-avatar.png');


            // hash password 
            body.password = await bcrypt.hash(body.password, 10);


            // get service 
            const response = await UserService.create({
                ...body,
                avatar: req.file?.filename ?? '',
                url_avatar
            });


            // create payload
            const payload = {
                id: response.id,
                name: response.name,
                email: response.email,
                role: response.role
            }


            // generate token 
            const token = jsonwebtoken.sign(
                payload,
                process.env.SECRET_KEY as string,
                { expiresIn: '1h' });


            // set cookie 
            res.cookie('token', token, {
                httpOnly: false,
                secure: true,
                sameSite: 'none'
            })


            // return 
            return res.status(201).json({
                status: "success",
                message: "berhasil membuat user",
                data: response
            })

        } catch (error) {

            // next error
            next(error)
        }
    }
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
                { expiresIn: '1h' }
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

