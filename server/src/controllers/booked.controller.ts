import { NextFunction, Request, Response } from "express";
import { BookedService } from "../services/booked.service";
import { ResponseType } from "../types/request-response-type";
import { BookedResponseType } from "../models/booked-model";

export class BookedController {
  // get times by id
  static async getTimesByMovieId(
    req: Request<{ id: string; times: string }>,
    res: Response<ResponseType<BookedResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get id movie
      const { id, times } = req.params;

      // get service
      const response = await BookedService.getBookedByMovieId(+id, times);

      // cek response
      if (!response) {
        return res.status(404).json({
          status: "failed",
          message: "booked not found",
          data: null,
        });
      }

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membaca booked",
        data: response,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }
}
