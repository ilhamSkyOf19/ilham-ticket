import { NextFunction, Request, Response } from "express";
import { ResponseType } from "../types/request-response-type";
import { WalletResponseType } from "../models/wallet-model";
import { WalletService } from "../services/wallet.service";
import { AuthRequest } from "../types/request-auth";

export class WalletController {
  // read
  static async readByEmail(
    req: AuthRequest,
    res: Response<ResponseType<WalletResponseType | null>>,
    next: NextFunction
  ) {
    try {
      // get email from req data
      const id = req.data?.id ?? 0;
      // get service
      const response = await WalletService.readById(id);

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membaca wallet",
        data: response,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }
  // read all
  static async readAll(
    _req: Request,
    res: Response<ResponseType<WalletResponseType[] | null>>,
    next: NextFunction
  ) {
    try {
      // get service
      const response = await WalletService.readAll();

      // return
      return res.status(200).json({
        status: "success",
        message: "berhasil membaca wallet",
        data: response,
      });
    } catch (error) {
      // next error
      next(error);
    }
  }
}
