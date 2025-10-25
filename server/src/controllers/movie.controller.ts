import { NextFunction, Request, Response } from "express";
import { MovieCreateType, MovieResponseType } from "../models/movie-model";
import validationService from "../services/validation.service";
import { MovieValidation } from "../validations/movie-validation";
import { ZodError } from "zod";
import { FileService } from "../services/file..service";
import { generateUrl } from "../helpers/helper";
import { MovieService } from "../services/movie.service";
import { ResponseType } from "../types/request-response-type";

export class MovieController {
    // create
    static async create(req: Request<{}, {}, MovieCreateType>, res: Response<ResponseType<MovieResponseType | null>>, next: NextFunction) {
        try {

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
            // error zod
            if (error instanceof ZodError) {

                // delete file request 
                if (req.file) {
                    await FileService.deleteFileRequest(req.file.path)
                }


                // error message
                const errorMessages = error.issues.map((err) => err.message)[0];

                // return error
                return res.status(400).json({
                    status: "failed",
                    message: errorMessages,
                    data: null
                });
            }

            // next error
            next(error)
        }

    }

    // read
    // read detail
    // update
    // delete
}