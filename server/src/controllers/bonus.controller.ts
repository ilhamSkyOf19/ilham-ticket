import { NextFunction, Request, Response } from "express";
import { BonusCreateType, BonusResponseType } from "../models/bonus-model";
import { ResponseType } from "../types/request-response-type";
import { BonusService } from "../services/bonus.service";

export class BonusController {
    // create 
    static async create(req: Request<{}, {}, BonusCreateType>, res: Response<ResponseType<BonusResponseType | null>>, next: NextFunction) {

        try {

            // get body 
            const body = req.body;


            // get service 
            const response = await BonusService.create(body);


            // return 
            return res.status(201).json({
                status: "success",
                message: "berhasil membuat bonus",
                data: response
            })

        } catch (error) {

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
}