import { NextFunction, Request, Response } from "express";
import { TheaterCreateType, TheaterResponseType, TheaterUpdateType } from "../models/theater-model";
import { TheaterService } from "../services/thater.service";
import { ResponseType } from "../types/request-response-type";

export class TheaterController {
    // create
    static async create(req: Request<{}, {}, TheaterCreateType>, res: Response<ResponseType<TheaterResponseType | null>>, next: NextFunction) {
        try {
            // get body
            const body = req.body;

            // get service 
            const response = await TheaterService.create(body);


            // return 
            return res.status(201).json({
                status: "success",
                message: "berhasil membuat theater",
                data: response
            })
        } catch (error) {
            // next error
            next(error)
        }
    }


    // read 
    static async read(_: Request, res: Response<ResponseType<TheaterResponseType[] | null>>, next: NextFunction) {
        try {
            // get genre
            const response = await TheaterService.read();


            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil membaca theater",
                data: response
            })
        } catch (error) {
            // next error
            next(error)
        }
    }

    // read detail
    static async readDetail(req: Request<{ id: string }>, res: Response<ResponseType<TheaterResponseType | null>>, next: NextFunction) {
        try {
            // get id params
            const id = req.params.id;


            // get genre
            const response = await TheaterService.readDetail(+id);



            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil membaca theater",
                data: response
            })
        } catch (error) {
            // next error
            next(error)
        }
    }


    // update 
    static async update(req: Request<{ id: string }, {}, TheaterUpdateType>, res: Response<ResponseType<TheaterResponseType | null>>, next: NextFunction) {
        try {

            // get params 
            const id = req.params.id;

            // get body 
            const body = req.body;



            // get service 
            const response = await TheaterService.update(+id, body);


            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil memperbarui theater",
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
            // get params 
            const id = req.params.id;


            // get service 
            await TheaterService.delete(+id);



            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil menghapus theater",
                data: null
            })

        } catch (error) {
            // next error
            next(error)
        }
    }
}