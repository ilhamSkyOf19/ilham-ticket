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
import { generateTotal } from "../helpers/formula";

export class TransactionTicketController {
  // payment
  static async payment(
    req: AuthRequest<
      {},
      {},
      Omit<TransactionTicketCreateType, "userId" | "type" | "total">
    >,
    res: Response<ResponseType<TransactionTicketResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get id from req data
      const id = req.data?.id ?? 0;

      // get body
      const { movieId, time, seats, theaterId } = req.body;

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
      const priceMovie = await MovieService.readPrice(movieId);

      // get total movie
      const total = priceMovie! * seats.length;

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

      // generate id
      const idTransaction: number =
        Date.now() + Math.floor(Math.random() * 1000);

      // ppn
      const ppn = 11; // %
      const bookingFee = 3000; // rupiah
      const discount = 2000; // rupiah

      // generate total
      const finalTotal = generateTotal(total, ppn, discount, bookingFee);

      // get midtrans auth string
      const midtransAuth = process.env.MIDTRANS_AUTH as string;

      // payload for midtrans
      const payload = {
        transaction_details: {
          order_id: `TICKET-${idTransaction}`,
          gross_amount: finalTotal,
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
        custom_field3: idTransaction,
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

      const transsaction = await TransactionTicketService.payment({
        id: idTransaction,
        movieId,
        time,
        seats,
        theaterId,
        total: finalTotal,
        userId: id,
        bookingFee,
        discount,
        ppn,
        url: data.redirect_url,
        subTotal: total,
      });
      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membuat transaction ticket",
        data: transsaction,
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
