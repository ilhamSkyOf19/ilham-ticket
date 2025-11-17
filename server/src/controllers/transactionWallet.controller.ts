import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/request-auth";
import {
  TransactionWalletResponseType,
  TransactionWalletWithPaginationResponseType,
} from "../models/transactionWallet-model";
import { TransactionWalletService } from "../services/transactionWallet.service";
import { ResponseType } from "../types/request-response-type";

export class TransactionWalletController {
  // read by user id
  static async readByUserEmail(
    req: AuthRequest<{}, {}, {}, { page: string; limit: string }>,
    res: Response<
      ResponseType<TransactionWalletWithPaginationResponseType | null>
    >,
    next: NextFunction
  ) {
    try {
      // get query
      const { page, limit } = req.query;

      // get data from req data
      const email = req.data?.email ?? "";

      // call service
      const response = await TransactionWalletService.readByUseremail(
        email,
        Number(page),
        Number(limit)
      );

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membaca transaction wallet",
        data: response,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }
}
