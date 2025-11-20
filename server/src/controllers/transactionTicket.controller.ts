import { NextFunction, Request, Response } from "express";
import { ResponseType } from "../types/request-response-type";
import {
  TransactionTicketCreateType,
  TransactionTicketResponseType,
} from "../models/transactionTicket-model";
import { AuthRequest } from "../types/request-auth";
import { MovieService } from "../services/movie.service";
import { BookedService } from "../services/booked.service";
import { TheaterService } from "../services/thater.service";
import { TransactionTicketService } from "../services/transactionTicket.service";

export class TransactionTicketController {
  // payment
  static async payment(
    req: AuthRequest<
      {},
      {},
      Omit<TransactionTicketCreateType, "userId" | "type">
    >,
    res: Response<ResponseType<TransactionTicketResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get id from req data
      const id = req.data?.id ?? 0;

      // get body
      const { movieId, time, seats, theaterId, total } = req.body;

      // cek movie
      await MovieService.readDetail(movieId);

      // cek theater
      await TheaterService.readDetail(theaterId);

      // cek booked
      const booked = await BookedService.getBookedByMovieId(movieId, time);

      // cek movie
      if (!booked) {
        return res.status(404).json({
          status: "failed",
          message: "movie not found",
          data: null,
        });
      }

      // cek seat
      for (const seat of seats) {
        if (booked.seatsBooked.includes(seat)) {
          return res.status(400).json({
            status: "failed",
            message: "seat not available",
            data: null,
          });
        }
      }

      // get service

      const response = await TransactionTicketService.payment({
        movieId,
        time,
        seats,
        theaterId,
        total,
        userId: id,
      });

      //   update booked in booked
      const updateBooked = await BookedService.updateSeatsBooked(
        booked.id,
        time,
        [...booked.seatsBooked, ...seats]
      );

      //   cek
      if (!updateBooked) {
        return res.status(404).json({
          status: "failed",
          message: "booked not found",
          data: null,
        });
      }

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membuat transaction ticket",
        data: response,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }
}
