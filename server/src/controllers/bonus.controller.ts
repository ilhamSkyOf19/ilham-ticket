import { NextFunction, Request, Response } from "express";
import { BonusCreateType, BonusResponseType, BonusUpdateType } from "../models/bonus-model";
import { ResponseType } from "../types/request-response-type";
import { BonusService } from "../services/bonus.service";
import { BonusValidation } from "../validations/bonus-validation";
import { FileService } from "../services/file.service";
import { generateUrl } from "../helpers/helper";
import validationService from "../services/validation.service";

export class BonusController {
    // create 
    static async create(req: Request<{}, {}, Omit<BonusCreateType, 'img'>>, res: Response<ResponseType<BonusResponseType | null>>, next: NextFunction) {

        try {

            // cek file 
            if (!req.file) {
                return res.status(400).json({
                    status: "failed",
                    message: "file not found",
                    data: null
                })
            }

            // get body 
            const body = validationService<Omit<BonusCreateType, 'img'>>(BonusValidation.CREATE, req.body);


            // generate url img 
            // base url 
            const baseUrl = `${req.protocol}://${req.get("host")}`;


            // generate 
            const url_img = generateUrl(baseUrl, 'bonus', req.file?.filename);





            // get service 
            const response = await BonusService.create({
                ...body.data,
                img: req.file?.filename,
                url_img
            });


            // return 
            return res.status(201).json({
                status: "success",
                message: "berhasil membuat bonus",
                data: response
            })

        } catch (error) {

            // delete file service 
            if (req.file) {
                await FileService.deleteFileRequest(req.file.path);
            }

            // next error
            next(error)
        }
    }


    // read 
    static async read(_req: Request, res: Response<ResponseType<BonusResponseType[] | null>>, next: NextFunction) {

        try {

            // get service 
            const response = await BonusService.read();


            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil membaca bonus",
                data: response
            })

        } catch (error) {

            // next error
            next(error)
        }
    }


    // read detail 
    static async readDetail(req: Request<{ id: string }>, res: Response<ResponseType<BonusResponseType | null>>, next: NextFunction) {
        try {
            // get id 
            const id = req.params.id;


            // get service 
            const response = await BonusService.readDetail(+id);



            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil membaca bonus",
                data: response
            })


        } catch (error) {

            // next error
            next(error)
        }
    }


    // update 
    static async update(req: Request<{ id: string }, {}, BonusUpdateType>, res: Response<ResponseType<BonusResponseType | null>>, next: NextFunction) {
        try {


            // get body 
            const body = validationService<Omit<BonusUpdateType, 'img'>>(BonusValidation.UPDATE, req.body);



            // get id 
            const id = req.params.id;

            // get bonus 
            const bonus = await BonusService.readDetail(+id);

            // cek file 
            if (req.file) {
                // delete file 
                await FileService.deleteFIleFormPath('bonus', bonus?.img || '');
            }


            // generate url img 
            // base url 
            const baseUrl = `${req.protocol}://${req.get("host")}`;


            // generate 
            const url_img = generateUrl(baseUrl, 'bonus', req.file?.filename);



            // get service 
            const response = await BonusService.update(+id, {
                ...body.data,
                img: req.file?.filename,
                url_img: req.file ? url_img : undefined
            });



            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil memperbarui bonus",
                data: response
            })


        } catch (error) {

            // delete file if error 
            if (req.file) {
                await FileService.deleteFileRequest(req.file.path);
            }

            // next error
            next(error)
        }
    }



    // delete 
    static async delete(req: Request<{ id: string }>, res: Response, next: NextFunction) {

        try {

            // get id 
            const id = req.params.id;




            // get service 
            const response = await BonusService.delete(+id);


            // delete file 
            await FileService.deleteFIleFormPath('bonus', response?.img || '');


            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil menghapus bonus",
                data: null
            })

        } catch (error) {

            // next error
            next(error)
        }
    }
}