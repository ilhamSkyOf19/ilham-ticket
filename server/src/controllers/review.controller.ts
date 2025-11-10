import { NextFunction, Request, Response } from "express";
import { ReviewCreateType, ReviewResponseType } from "../models/review-model";
import { AuthRequest } from "../types/request-auth";
import { ResponseType } from "../types/request-response-type";
import { Payload } from "../types/payload";
import { ReviewService } from "../services/review.service";
import { MovieService } from "../services/movie.service";

export class ReviewController {
    // create
    static async create(req: AuthRequest<{}, {}, Omit<ReviewCreateType, 'username'>>, res: Response<ResponseType<ReviewResponseType | null>>, next: NextFunction) {
        try {

            // get body 
            const body = req.body;


            // get payload auth 
            const payload = req.data as Payload;


            // cek movie 
            await MovieService.readDetail(body.movieId);




            // get service 
            const response = await ReviewService.create({
                ...body,
                userId: payload.id,
            });


            // return 
            return res.status(201).json({
                status: "success",
                message: "berhasil membuat review",
                data: response
            })


        } catch (error) {

            // next error
            next(error)
        }
    }



    // read 
    static async readWhereMovie(req: Request<{ movieId: string }>, res: Response<ResponseType<ReviewResponseType[] | null>>, next: NextFunction) {
        try {

            // get movie id
            const movieId = +req.params.movieId;


            // get service 
            const response = await ReviewService.readWhereMovie(movieId);


            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil membaca review",
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
            const id = +req.params.id;





            // get service 
            const response = await ReviewService.delete(id);


            // return 
            return res.status(200).json({
                status: "success",
                message: "berhasil menghapus review",
                data: response
            })


        } catch (error) {

            // next error
            next(error)
        }
    }
}