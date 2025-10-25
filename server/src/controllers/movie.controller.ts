import { NextFunction, Request, Response } from "express";
import { MovieCreateType, MovieResponseReadType, MovieResponseType, MovieUpdateType } from "../models/movie-model";
import validationService from "../services/validation.service";
import { MovieValidation } from "../validations/movie-validation";
import { ZodError } from "zod";
import { FileService } from "../services/file.service";
import { generateUrl } from "../helpers/helper";
import { MovieService } from "../services/movie.service";
import { ResponseType } from "../types/request-response-type";

export class MovieController {
    // create
    static async create(req: Request<{}, {}, MovieCreateType>, res: Response<ResponseType<MovieResponseType | null>>, next: NextFunction) {
        try {


            // cek file 
            if (!req.file) {
                return res.status(400).json({
                    status: "failed",
                    message: "file not found",
                    data: null
                })
            }

            // get body & cek body 
            const body = validationService<Omit<MovieCreateType, 'thumbnail'>>(MovieValidation.CREATE, {
                ...req.body,
                price: Number(req.body.price),
                available: Boolean(req.body.available),
                genreId: Number(req.body.genreId),
                theaterId: Number(req.body.theaterId)

            });


            // base url 
            const baseUrl = `${req.protocol}://${req.get("host")}`;


            // generate 
            const url_thumbnail = generateUrl(baseUrl, 'thumbnails', req.file?.filename);


            // get service 
            const response = await MovieService.create({
                ...body.data,
                thumbnail: req.file?.filename ?? '',
                url_thumbnail: url_thumbnail
            })


            // return 
            return res.status(201).json({
                status: "success",
                message: "berhasil membuat movie",
                data: response
            })



        } catch (error) {
            // delete file request 
            if (req.file) {
                await FileService.deleteFileRequest(req.file.path)
            }


            // next error
            next(error)
        }

    }



    // read
    static async read(_req: Request, res: Response<ResponseType<MovieResponseReadType[] | null>>, next: NextFunction) {
        try {
            // get service 
            const response = await MovieService.read();

            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil membaca movie",
                data: response
            })


        } catch (error) {
            // next error
            next(error)
        }

    }

    // read detail
    static async readDetail(req: Request<{ id: string }>, res: Response<ResponseType<MovieResponseReadType | null>>, next: NextFunction) {
        try {

            // get params id 
            const id = req.params.id;

            // get service 
            const response = await MovieService.readDetail(+id);

            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil membaca movie",
                data: response
            })





        } catch (error) {
            // next error
            next(error)
        }
    }


    // update
    static async upadte(req: Request<{ id: string }, {}, MovieUpdateType>, res: Response<ResponseType<MovieResponseType | null>>, next: NextFunction) {
        try {
            // get params 
            const id = req.params.id;


            // cek body 
            const body = validationService<Omit<MovieUpdateType, 'thumbnail'>>(MovieValidation.UPDATE, {
                ...req.body,
                price: req.body.price ? Number(req.body.price) : undefined,
                available: req.body.available ? Boolean(req.body.available) : undefined,
                genreId: req.body.genreId ? Number(req.body.genreId) : undefined,
                theaterId: req.body.theaterId ? Number(req.body.theaterId) : undefined,
            });





            // base url 
            const baseUrl = `${req.protocol}://${req.get("host")}`;


            // generate 
            const url_thumbnail = req.file ? generateUrl(baseUrl, 'thumbnails', req.file?.filename) : undefined;


            // get service 
            const response = await MovieService.update(+id, {
                ...body.data,
                thumbnail: req.file?.filename,
                url_thumbnail: url_thumbnail
            });





            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil update movie",
                data: response
            })


        } catch (error) {

            // delete file request 
            if (req.file) {
                await FileService.deleteFileRequest(req.file.path)
            }

            // next error
            next(error)
        }
    }



    // delete
    static async delete(req: Request<{ id: string }>, res: Response<ResponseType<MovieResponseType | null>>, next: NextFunction) {
        try {
            // get id 
            const id = req.params.id;


            // get service 
            const response = await MovieService.delete(+id);

            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil menghapus movie",
                data: response
            })


        } catch (error) {
            // next error
            next(error)
        }
    }
}