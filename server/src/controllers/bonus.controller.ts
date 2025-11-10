import { NextFunction, Request, Response } from "express";
import { BonusCreateType, BonusResponseType, BonusUpdateType } from "../models/bonus-model";
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
            const body = req.body;



            // get id 
            const id = req.params.id;

            // get service 
            const response = await BonusService.update(+id, body);



            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil memperbarui bonus",
                data: response
            })


        } catch (error) {

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
            await BonusService.delete(+id);


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