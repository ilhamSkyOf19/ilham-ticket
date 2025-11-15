import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/request-auth";
import { TransactionWalletResponseType } from "../models/transactionWallet-model";
import { TransactionWalletService } from "../services/transactionWallet.service";
import { ResponseType } from "../types/request-response-type";

export class TransactionWalletController {
  // read by user id
  static async readByUserEmail(
    req: AuthRequest,
    res: Response<ResponseType<TransactionWalletResponseType[] | null>>,
    next: NextFunction
  ) {
    try {
      // get data from req data
      const email = req.data?.email ?? "";

      // call service
      const response = await TransactionWalletService.readByUseremail(email);

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
