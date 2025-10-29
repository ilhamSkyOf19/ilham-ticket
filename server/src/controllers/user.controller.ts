import { NextFunction, Request, Response } from "express";
import { UserCreateType, UserResponseType, UserUpdateType } from "../models/user-model";
import { ResponseType } from "../types/request-response-type";
import { UserService } from "../services/user.service";
import { generateUrl } from "../helpers/helper";
import { FileService } from "../services/file.service";
import bcrypt from "bcrypt";
import validationService from "../services/validation.service";
import { UserValidation } from "../validations/user-validation";
import jsonwebtoken from "jsonwebtoken";

export class UserController {
    // create 
    static async create(req: Request<{}, {}, UserCreateType>, res: Response<ResponseType<UserResponseType | null>>, next: NextFunction) {
        try {

            // get body & validation 
            const body = validationService(UserValidation.CREATE, req.body);


            // base url 
            const baseUrl = `${req.protocol}://${req.get("host")}`;


            // generate 
            const url_avatar = generateUrl(baseUrl, 'avatars', req.file?.filename);


            // hash password 
            body.data.password = await bcrypt.hash(body.data.password, 10);


            // get service 
            const response = await UserService.create({
                ...body.data,
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
                { expiresIn: '1d' });


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

            // delete file request 
            if (req.file) await FileService.deleteFileRequest(req.file.path);
            // next error
            next(error)
        }
    }


    // read 
    static async read(_req: Request, res: Response<ResponseType<UserResponseType[] | null>>, next: NextFunction) {
        try {
            // get service 
            const response = await UserService.read();


            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil membaca user",
                data: response
            })
        } catch (error) {
            // next error
            next(error)
        }
    }


    // read detail 
    static async readDetail(req: Request<{ id: string }>, res: Response<ResponseType<UserResponseType | null>>, next: NextFunction) {
        try {

            // get id params 
            const id = req.params.id;


            // get service
            const response = await UserService.readDetail(+id);



            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil membaca user",
                data: response
            })


        } catch (error) {
            // next error
            next(error)
        }
    }


    // update 
    static async update(req: Request<{ id: string }, {}, UserUpdateType>, res: Response<ResponseType<UserResponseType | null>>, next: NextFunction) {
        try {
            // get id params 
            const id = req.params.id;


            // get body 
            const body = validationService(UserValidation.UPDATE, req.body);

            // base url 
            const baseUrl = `${req.protocol}://${req.get("host")}`;


            // generate 
            const url_avatar = req.file ? generateUrl(baseUrl, 'avatars', req.file?.filename) : undefined;

            // get service 
            const response = await UserService.update(+id, {
                ...body.data,
                avatar: req.file?.filename,
                url_avatar
            });


            // return
            return res.status(200).json({
                status: "success",
                message: "berhasil update user",
                data: response
            })

        } catch (error) {
            // delete file request 
            if (req.file) await FileService.deleteFileRequest(req.file.path);
            // next error
            next(error)
        }
    }


    // delete 
    static async delete(req: Request<{ id: string }>, res: Response<ResponseType<UserResponseType | null>>, next: NextFunction) {
        try {
            // get id params 
            const id = req.params.id;


            // get service 
            const response = await UserService.delete(+id);


            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil menghapus user",
                data: response
            })
        } catch (error) {
            // next error
            next(error)
        }
    }
}