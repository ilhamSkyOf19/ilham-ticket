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

      // cek req seats if same
      const hasSameSeats = new Set(seats).size !== seats.length;

      // cek req seats
      if (hasSameSeats) {
        return res.status(400).json({
          status: "failed",
          message: "seats must be unique",
          data: null,
        });
      }

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

      const transsaction = await TransactionTicketService.payment({
        movieId,
        time,
        seats,
        theaterId,
        total,
        userId: id,
      });

      // get midtrans auth string
      const midtransAuth = process.env.MIDTRANS_AUTH as string;

      // payload for midtrans
      const payload = {
        transaction_details: {
          order_id: `ORDER-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          gross_amount: total,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: req.data?.email,
        },
        metadata: {
          seats: seats,
        },
        custom_field1: booked.id,
        custom_field2: "ticket",
        custom_field3: transsaction?.id,
      };

      const midtransResponse = await fetch(process.env.MIDTRANS_URL as string, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${midtransAuth}`,
        },
        body: JSON.stringify(payload),
      });

      // convert json
      const data = await midtransResponse.json();

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membuat transaction ticket",
        data: data,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }

  // read
  static async readByUserId(
    req: AuthRequest,
    res: Response<ResponseType<TransactionTicketResponseType[] | null>>,
    next: NextFunction
  ) {
    try {
      // get id from req data
      const id = req.data?.id ?? 0;

      // get data
      const data = await TransactionTicketService.readByUserId(id);

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membaca transaction ticket",
        data: data,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }
}
