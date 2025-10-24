import { NextFunction, Request, Response } from "express";
import { ResponseType } from "../types/request-response-type";
import { GenreCreateType, GenreResponseType, GenreUpdateType } from "../models/genre-model";
import { GenreService } from "../services/genre.service";

export class GenreController {
    // create 
    static async create(req: Request<{}, {}, GenreCreateType>, res: Response<ResponseType<GenreResponseType | null>>, next: NextFunction) {
        try {
            // get body 
            const body = req.body;

            // create genre 
            const response = await GenreService.create(body);


            // cek respponse 
            if (!response) {
                return res.status(400).json({
                    status: "failed",
                    message: "gagal membuat genre",
                    data: null
                });
            }


            // return genre
            return res.status(201).json({
                status: "success",
                message: "berhasil membuat genre",
                data: response
            })
        } catch (error) {

            // next error
            next(error)
        }
    }
    // read 
    static async read(_: Request, res: Response, next: NextFunction) {
        try {

            // create genre 
            const response = await GenreService.read();


            // return genre
            return res.status(200).json({
                status: "success",
                message: "berhasil membaca genre",
                data: response
            })
        } catch (error) {

            // next error
            next(error)
        }
    }

    // read detail 
    static async readDetail(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            // get id 
            const id = req.params.id;


            // get genre 
            const response = await GenreService.readDetail(+id);



            // return genre
            return res.status(200).json(response);
        } catch (error) {

            // next error
            next(error)
        }
    }

    // update 
    static async update(req: Request<{ id: string }, {}, GenreUpdateType>, res: Response<ResponseType<GenreResponseType | null>>, next: NextFunction) {
        try {
            // get id 
            const id = req.params.id;


            // get body 
            const body = req.body;



            // update genre 
            const response = await GenreService.update(+id, body);



            // return genre
            return res.status(200).json({
                status: "success",
                message: "berhasil memperbarui genre",
                data: response
            });
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


            // delete genre 
            await GenreService.delete(+id);


            // return genre
            return res.status(200).json({
                status: "success",
                message: "berhasil menghapus genre",
                data: null
            });
        } catch (error) {

            // next error
            next(error)
        }
    }
}