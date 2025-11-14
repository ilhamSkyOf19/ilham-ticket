import { NextFunction, Request, Response } from "express";
import { SeatsService } from "../services/seats.service";
import { SeatsResponseType } from "../models/seats-model";
import { ResponseType } from "../types/request-response-type";

export class SeatsController {
  // read seats by movie
  static async readByMovieId(
    req: Request<{ id: string }>,
    res: Response<ResponseType<SeatsResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get params
      const { id } = req.params;

      // get service
      const response = await SeatsService.readByMovieId(+id);

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membaca seat",
        data: response,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }
}
